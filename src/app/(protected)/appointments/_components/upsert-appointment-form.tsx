"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Calendar as CalendarIcon, CalendarPlus, Clock, SaveIcon, Trash2, TriangleAlert } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { deleteAppointment } from "@/actions/delete-appointment";
import { upsertAppointment } from "@/actions/upsert-appointment";
import { generateTimeSlots } from "@/app/(protected)/appointments/_helpers/generate-time-slots";
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
import { cn } from "@/lib/utils";

// Estende o dayjs com o plugin UTC
dayjs.extend(utc);

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
    const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    // Função para extrair o horário de uma data
    const extractTimeSlot = (date: Date): string => {
        // Primeiro converte para UTC (como está armazenado) e depois extrai o horário local
        return dayjs(date).format("HH:mm");
    };

    const form = useForm<z.infer<typeof formSchema>>({
        shouldUnregister: true,
        resolver: zodResolver(formSchema),
        defaultValues: {
            patientId: appointment?.patientId ?? "",
            doctorId: appointment?.doctorId ?? "",
            date: appointment?.date ? new Date(appointment.date) : undefined,
            timeSlot: appointment?.date ? extractTimeSlot(appointment.date) : "",
            appointmentPrice: appointment?.appointmentPriceInCents
                ? appointment.appointmentPriceInCents / 100
                : 0,
        },
    });

    const watchDoctorId = form.watch("doctorId");
    const watchPatientId = form.watch("patientId");
    const watchDate = form.watch("date");

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

    // Atualiza os horários disponíveis quando a data ou o médico mudam
    useEffect(() => {
        if (watchDate && selectedDoctor) {
            const timeSlots = generateTimeSlots(selectedDoctor, watchDate);
            setAvailableTimeSlots(timeSlots);

            // Limpa o horário selecionado se não estiver mais disponível
            const currentTimeSlot = form.getValues("timeSlot");
            if (currentTimeSlot && !timeSlots.includes(currentTimeSlot)) {
                form.setValue("timeSlot", "");
            }
        } else {
            setAvailableTimeSlots([]);
        }
    }, [watchDate, selectedDoctor, form]);

    // Reseta o formulário quando o diálogo é fechado
    useEffect(() => {
        if (!isOpen) {
            form.reset({
                patientId: appointment?.patientId ?? "",
                doctorId: appointment?.doctorId ?? "",
                date: appointment?.date ? new Date(appointment.date) : undefined,
                timeSlot: appointment?.date ? extractTimeSlot(appointment.date) : "",
                appointmentPrice: appointment?.appointmentPriceInCents
                    ? appointment.appointmentPriceInCents / 100
                    : 0,
            });
        }
    }, [isOpen, form, appointment]);

    const upsertAppointmentAction = useAction(upsertAppointment, {
        onSuccess: () => {
            toast.success("Agendamento salvo com sucesso.");
            onSuccess?.();
        },
        onError: () => {
            toast.error("Erro ao salvar agendamento.");
        },
    });

    const deleteAppointmentAction = useAction(deleteAppointment, {
        onSuccess: () => {
            toast.success("Agendamento deletado com sucesso.");
            onSuccess?.();
        },
        onError: () => {
            toast.error("Erro ao deletar agendamento.");
        },
    });

    const handleDeleteAppointmentClick = () => {
        if (!appointment) return;
        deleteAppointmentAction.execute({ id: appointment.id });
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        upsertAppointmentAction.execute({
            ...values,
            id: appointment?.id,
            appointmentPriceInCents: values.appointmentPrice * 100,
        });
    };

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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
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
                                                <CalendarIcon className="mr-2 h-4 w-4" />
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
                        control={form.control}
                        name="timeSlot"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Horário</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    disabled={!watchDoctorId || !watchPatientId || !watchDate || availableTimeSlots.length === 0}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione um horário" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {availableTimeSlots.length === 0 ? (
                                            <div className="p-2 text-center text-sm text-muted-foreground">
                                                {watchDate ? "Não há horários disponíveis para esta data." : "Selecione uma data primeiro."}
                                            </div>
                                        ) : (
                                            availableTimeSlots.map((timeSlot) => (
                                                <SelectItem key={timeSlot} value={timeSlot}>
                                                    <div className="flex items-center">
                                                        <Clock className="mr-2 h-4 w-4" />
                                                        {timeSlot}
                                                    </div>
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Separator />

                    <DialogFooter className="gap-2 sm:gap-0">
                        {appointment && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button type="button" variant="destructive">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Excluir
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="flex items-center">
                                            <TriangleAlert className="mr-2 h-5 w-5 text-destructive" />
                                            Tem certeza que deseja excluir?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta ação não poderá ser desfeita.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDeleteAppointmentClick}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            Excluir
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                        <Button type="submit" disabled={upsertAppointmentAction.isPending}>
                            {upsertAppointmentAction.isPending
                                ? (
                                    <>
                                        <SaveIcon className="h-4 w-4 mr-2" />
                                        Salvando...
                                    </>
                                )
                                : appointment
                                    ? (
                                        <>
                                            <SaveIcon className="h-4 w-4 mr-2" />
                                            Atualizar
                                        </>
                                    )
                                    : (
                                        <>
                                            <SaveIcon className="h-4 w-4 mr-2" />
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