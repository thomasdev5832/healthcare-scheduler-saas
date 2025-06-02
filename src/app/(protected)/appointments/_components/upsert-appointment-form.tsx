"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AlertCircle, Calendar as CalendarIcon, CalendarPlus, CheckCircle2, Clock, Clock2, SaveIcon, Trash2, TriangleAlert, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { TimeSlot, useAvailableTimes, useDeleteAppointment, useUpsertAppointment } from "@/hooks/appointments";
import { cn } from "@/lib/utils";

// Estende o dayjs com o plugin UTC
dayjs.extend(utc);

type FormValues = {
    patientId: string;
    doctorId: string;
    date: Date;
    timeSlot: string;
    appointmentPrice: number;
    status: "scheduled" | "completed" | "canceled" | "no_show";
};

const formSchema = z.object({
    patientId: z.string().uuid({
        message: "Paciente é obrigatório.",
    }),
    doctorId: z.string().uuid({
        message: "Médico é obrigatório.",
    }),
    date: z.date({
        required_error: "Data é obrigatória.",
    }),
    timeSlot: z.string().min(1, {
        message: "Horário é obrigatório.",
    }),
    appointmentPrice: z.number().min(1, {
        message: "Valor da consulta é obrigatório.",
    }).max(99999.99, {
        message: "Valor da consulta não pode ser maior que R$ 99.999,99.",
    }),
    status: z.enum(["scheduled", "completed", "canceled", "no_show"]).default("scheduled"),
});

interface UpsertAppointmentFormProps {
    isOpen: boolean;
    appointment?: typeof appointmentsTable.$inferSelect;
    doctors: typeof doctorsTable.$inferSelect[];
    patients: typeof patientsTable.$inferSelect[];
    onSuccess?: () => void;
}

const UpsertAppointmentForm = ({
    appointment,
    doctors,
    patients,
    onSuccess,
    isOpen
}: UpsertAppointmentFormProps) => {
    const [selectedDoctor, setSelectedDoctor] = useState<typeof doctorsTable.$inferSelect | null>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [currentAppointmentTimeSlot, setCurrentAppointmentTimeSlot] = useState<string | null>(null);

    // Função para extrair o horário de uma data
    const extractTimeSlot = (date: Date): string => {
        return dayjs(date).format("HH:mm");
    };

    // Inicializa o formulário com valores padrão
    const defaultValues = useMemo(() => ({
        patientId: appointment?.patientId ?? "",
        doctorId: appointment?.doctorId ?? "",
        date: appointment?.date ? new Date(appointment.date) : new Date(),
        timeSlot: appointment?.date ? extractTimeSlot(new Date(appointment.date)) : "",
        appointmentPrice: appointment?.appointmentPriceInCents
            ? appointment.appointmentPriceInCents / 100
            : 0,
        status: appointment?.status ?? "scheduled",
    }), [appointment]);

    const form = useForm<FormValues>({
        // @ts-expect-error - Resolver type issues
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    // Reseta o formulário quando o appointment ou isOpen mudam
    useEffect(() => {
        if (isOpen) {
            form.reset(defaultValues);

            if (appointment?.date) {
                const timeSlot = extractTimeSlot(new Date(appointment.date));
                setCurrentAppointmentTimeSlot(timeSlot);
            }
        }
    }, [form, defaultValues, appointment, isOpen]);

    const watchDoctorId = form.watch("doctorId");
    const watchPatientId = form.watch("patientId");
    const watchDate = form.watch("date");

    // Usando os hooks do React Query
    const { mutate: upsertAppointmentMutation, isPending: isUpsertPending } = useUpsertAppointment();
    const { mutate: deleteAppointmentMutation, isPending: isDeletePending } = useDeleteAppointment();
    const {
        data: availableTimeSlots = [],
        isLoading: isLoadingTimeSlots,
        isFetching: isFetchingTimeSlots
    } = useAvailableTimes(watchDoctorId, watchDate);

    // Reseta o campo de horário quando a data é alterada
    useEffect(() => {
        // Verifica se a data atual é diferente da data original do agendamento
        if (appointment?.date) {
            const originalDate = dayjs(appointment.date).format('YYYY-MM-DD');
            const currentDate = dayjs(watchDate).format('YYYY-MM-DD');

            // Se a data foi alterada, limpa o campo de horário e remove o indicador de horário atual
            if (originalDate !== currentDate) {
                form.setValue("timeSlot", "");
                setCurrentAppointmentTimeSlot(null); // Limpa o horário atual quando a data é alterada
            } else {
                // Se voltou para a data original, restaura o horário atual
                const timeSlot = extractTimeSlot(new Date(appointment.date));
                setCurrentAppointmentTimeSlot(timeSlot);
            }
        }
    }, [watchDate, appointment, form, extractTimeSlot]);

    // Processa os slots de tempo para incluir o horário atual do agendamento
    const customTimeSlots = useMemo(() => {
        if (!availableTimeSlots) {
            return availableTimeSlots;
        }

        // Se não estiver na data original ou não tiver um horário atual, retorna os slots normais
        if (!currentAppointmentTimeSlot || !appointment) {
            return availableTimeSlots;
        }

        // Verifica se o horário atual existe na lista
        const currentTimeSlotExists = availableTimeSlots.some(
            (slot: TimeSlot) => slot.value === currentAppointmentTimeSlot
        );

        if (!currentTimeSlotExists) {
            // Se não existir, adiciona à lista
            const updatedSlots = [
                ...availableTimeSlots,
                {
                    value: currentAppointmentTimeSlot,
                    available: true,
                    label: `${currentAppointmentTimeSlot.substring(0, 5)} (Horário atual)`
                }
            ];

            // Ordena os horários
            return updatedSlots.sort((a, b) => a.value.localeCompare(b.value));
        } else {
            // Se existir, marca como disponível
            return availableTimeSlots.map((slot: TimeSlot) => {
                if (slot.value === currentAppointmentTimeSlot) {
                    return {
                        ...slot,
                        available: true,
                        label: `${slot.label} (Horário atual)`
                    };
                }
                return slot;
            });
        }
    }, [availableTimeSlots, currentAppointmentTimeSlot, appointment]);

    // Atualiza o médico selecionado e o preço da consulta quando o médico é selecionado
    useEffect(() => {
        if (watchDoctorId) {
            const doctor = doctors.find(doctor => doctor.id === watchDoctorId);
            if (doctor) {
                setSelectedDoctor(doctor);
                form.setValue("appointmentPrice", doctor.appointmentPriceInCents / 100);
            }
        } else {
            setSelectedDoctor(null);
        }
    }, [watchDoctorId, doctors, form]);

    const handleDeleteAppointmentClick = () => {
        if (!appointment) return;

        deleteAppointmentMutation({ id: appointment.id }, {
            onSuccess: () => {
                toast.success("Agendamento deletado com sucesso.");
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(`Erro ao deletar agendamento: ${error.message}`);
            }
        });
    };

    const onSubmit = (values: FormValues) => {
        upsertAppointmentMutation({
            ...values,
            id: appointment?.id,
            appointmentPriceInCents: values.appointmentPrice * 100,
        }, {
            onSuccess: () => {
                toast.success("Agendamento salvo com sucesso.");
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(`Erro ao salvar agendamento: ${error.message}`);
            }
        });
    };

    const isLoadingOrFetching = isLoadingTimeSlots || isFetchingTimeSlots;
    const availableSlots = customTimeSlots.filter((slot: TimeSlot) => slot.available);
    const hasAvailableSlots = availableSlots.length > 0;
    const hasTimeSlots = customTimeSlots.length > 0;

    return (
        <DialogContent>
            <DialogHeader className="ml-2">
                <DialogTitle className="flex items-center flex-row">
                    <CalendarPlus className="mr-2 h-5 w-5" />
                    {appointment ? "Editar agendamento" : "Novo agendamento"}
                </DialogTitle>

                <DialogDescription>
                    {appointment
                        ? "Edite as informações desse agendamento."
                        : "Preencha os dados do novo agendamento."}
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <Form {...form}>
                <form
                    // @ts-expect-error - Type issues with form submit
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        // @ts-expect-error - Type issues with form control
                        control={form.control}
                        name="patientId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Paciente</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione um paciente" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {patients.map((patient) => (
                                            <SelectItem key={patient.id} value={patient.id}>
                                                {patient.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        // @ts-expect-error - Type issues with form control
                        control={form.control}
                        name="doctorId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Médico</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione um médico" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {doctors.map((doctor) => (
                                            <SelectItem key={doctor.id} value={doctor.id}>
                                                {doctor.name} - {doctor.specialty}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        // @ts-expect-error - Type issues with form control
                        control={form.control}
                        name="appointmentPrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Valor da consulta</FormLabel>
                                <NumericFormat
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value.floatValue);
                                    }}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    decimalSeparator=","
                                    allowNegative={false}
                                    allowLeadingZeros={false}
                                    thousandSeparator="."
                                    customInput={Input}
                                    prefix="R$"
                                    disabled={!watchDoctorId}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        // @ts-expect-error - Type issues with form control
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Data</FormLabel>
                                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                    <PopoverTrigger asChild disabled={!watchDoctorId || !watchPatientId}>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                disabled={!watchDoctorId || !watchPatientId}
                                            >
                                                <CalendarIcon className="h-4 w-4" />
                                                {field.value ? (
                                                    format(field.value, "PPP", { locale: ptBR })
                                                ) : (
                                                    <span>Selecione uma data</span>
                                                )}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                field.onChange(date);
                                                setIsCalendarOpen(false);
                                            }}
                                            initialFocus
                                            locale={ptBR}
                                            fromDate={new Date()}
                                            disabled={(date) => {
                                                if (selectedDoctor) {
                                                    const dayOfWeek = dayjs(date).day();
                                                    return dayOfWeek < selectedDoctor.availableFromWeekDay ||
                                                        dayOfWeek > selectedDoctor.availableToWeekDay;
                                                }
                                                return false;
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        // @ts-expect-error - Type issues with form control
                        control={form.control}
                        name="timeSlot"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Horário</FormLabel>
                                {isLoadingOrFetching && (
                                    <div className="text-sm text-muted-foreground mb-2">
                                        Carregando horários disponíveis...
                                    </div>
                                )}
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    disabled={!watchDoctorId || !watchPatientId || !watchDate || !hasTimeSlots || isLoadingOrFetching}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={isLoadingOrFetching ? "Carregando horários..." : "Selecione um horário"} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {isLoadingOrFetching ? (
                                            <div className="p-2 text-center text-sm text-muted-foreground">
                                                Carregando horários disponíveis...
                                            </div>
                                        ) : !hasTimeSlots && watchDate ? (
                                            <div className="p-2 text-center text-sm text-muted-foreground">
                                                Não há horários para esta data.
                                            </div>
                                        ) : !watchDate ? (
                                            <div className="p-2 text-center text-sm text-muted-foreground">
                                                Selecione uma data primeiro.
                                            </div>
                                        ) : (
                                            customTimeSlots.map((timeSlot: TimeSlot) => (
                                                <SelectItem
                                                    key={timeSlot.value}
                                                    value={timeSlot.value}
                                                    disabled={!timeSlot.available}
                                                >
                                                    <div className="flex items-center">
                                                        <Clock className="mr-2 h-4 w-4" />
                                                        {timeSlot.label}
                                                        {!timeSlot.available && (
                                                            <span className="ml-2 text-xs">
                                                                (Indisponível)
                                                            </span>
                                                        )}
                                                    </div>
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                {watchDate && watchDoctorId && !hasAvailableSlots && !isLoadingOrFetching && !currentAppointmentTimeSlot && (
                                    <div className="text-sm text-destructive mt-2">
                                        Todos os horários desta data estão ocupados.
                                    </div>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        // @ts-expect-error - Type issues with form control
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione um status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="scheduled" className="flex items-center">
                                            <div className="flex items-center">
                                                <Clock2 className="mr-2 h-4 w-4 text-muted-foreground" />
                                                Agendado
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            <div className="flex items-center">
                                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                                Concluído
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="canceled">
                                            <div className="flex items-center">
                                                <XCircle className="mr-2 h-4 w-4 text-destructive" />
                                                Cancelado
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="no_show">
                                            <div className="flex items-center">
                                                <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                                                Não Compareceu
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Separator />

                    <DialogFooter>
                        {appointment && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button type="button" variant="outline">
                                        <Trash2 className="mr-1" />
                                        Excluir consulta
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Tem certeza que deseja excluir esta consulta?</AlertDialogTitle>
                                        <AlertDialogDescription className="bg-destructive/20 text-destructive font-medium border rounded-md p-4 border-destructive">
                                            <TriangleAlert className="inline mr-2" />
                                            Essa ação não pode ser desfeita. Todos os dados relacionados a essa consulta serão perdidos.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteAppointmentClick} className="bg-destructive hover:bg-red-700 cursor-pointer">
                                            <Trash2 className="mr-1" />
                                            Excluir
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                        <Button type="submit" disabled={isUpsertPending || isDeletePending}>
                            {isUpsertPending
                                ? (
                                    <>
                                        <SaveIcon className="h-4 w-4" />
                                        Salvando...
                                    </>
                                )
                                : appointment
                                    ? (
                                        <>
                                            <SaveIcon className="h-4 w-4" />
                                            Atualizar
                                        </>
                                    )
                                    : (
                                        <>
                                            <SaveIcon className="h-4 w-4" />
                                            Adicionar
                                        </>
                                    )
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
};

export default UpsertAppointmentForm; 