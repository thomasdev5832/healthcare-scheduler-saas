import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, Trash2, TriangleAlert, User } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { deletePatient } from "@/actions/delete-patient";
import { upsertPatient } from "@/actions/upsert-patient";
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
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { patientSexEnum, patientsTable } from "@/db/schema";

const formSchema = z.object({
    name: z.string().trim().min(1, {
        message: "Nome é obrigatório.",
    }).max(100, {
        message: "Nome não pode ter mais de 100 caracteres.",
    }),
    email: z.string().email({
        message: "Email inválido.",
    }),
    phoneNumber: z.string().min(1, {
        message: "Número de telefone é obrigatório.",
    }),
    sex: z.enum([patientSexEnum.enumValues[0], patientSexEnum.enumValues[1]], {
        errorMap: () => ({ message: "Sexo é obrigatório." }),
    }),
});

interface UpsertPatientFormProps {
    isOpen: boolean;
    patient?: typeof patientsTable.$inferSelect;
    onSuccess?: () => void;
}

const UpsertPatientForm = ({ patient, onSuccess, isOpen }: UpsertPatientFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        shouldUnregister: true,
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: patient?.name ?? "",
            email: patient?.email ?? "",
            phoneNumber: patient?.phoneNumber ?? "",
            sex: patient?.sex ?? patientSexEnum.enumValues[0],
        },
    });

    useEffect(() => {
        if (!isOpen) {
            form.reset(patient);
        }
    }, [isOpen, form, patient]);

    const upsertPatientAction = useAction(upsertPatient, {
        onSuccess: () => {
            toast.success("Paciente salvo com sucesso.");
            onSuccess?.();
        },
        onError: () => {
            toast.error("Erro ao salvar paciente.");
        },
    });

    const deletePatientAction = useAction(deletePatient, {
        onSuccess: () => {
            toast.success("Paciente excluído com sucesso.");
            onSuccess?.();
        },
        onError: () => {
            toast.error("Erro ao excluir paciente.");
        },
    });

    const handleDeletePatientClick = () => {
        if (!patient) return;
        deletePatientAction.execute({ id: patient.id });
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        upsertPatientAction.execute({
            ...values,
            id: patient?.id,
        });
    };

    return (
        <DialogContent>
            <DialogHeader className="ml-2">
                <DialogTitle className="flex items-center flex-row">
                    <User className="mr-2 h-5 w-5" />
                    {patient ? `${patient.name}` : "Adicionar paciente"}
                </DialogTitle>

                <DialogDescription>
                    {patient
                        ? "Edite as informações desse paciente."
                        : "Preencha os dados do novo paciente."}
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                    <PatternFormat
                                        format="(##) #####-####"
                                        mask="_"
                                        customInput={Input}
                                        value={field.value}
                                        onValueChange={(values) => {
                                            field.onChange(values.value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sex"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sexo</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione o sexo" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={patientSexEnum.enumValues[0]}>Masculino</SelectItem>
                                        <SelectItem value={patientSexEnum.enumValues[1]}>Feminino</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter>
                        {patient && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline">
                                        <Trash2 className="mr-1" />
                                        Excluir paciente
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Tem certeza que deseja excluir o paciente {patient.name}?</AlertDialogTitle>
                                        <AlertDialogDescription className="bg-destructive/20 text-destructive font-medium border rounded-md p-4 border-destructive">
                                            <TriangleAlert className="inline mr-2" />
                                            Essa ação não pode ser desfeita. Todos os dados relacionados a esse paciente serão perdidos, incluindo consultas agendadas.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeletePatientClick} className="bg-destructive hover:bg-red-700 cursor-pointer">
                                            <Trash2 className="mr-1" />
                                            Excluir
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                        <Button type="submit" disabled={upsertPatientAction.isPending}>
                            {upsertPatientAction.isPending
                                ? (
                                    <>
                                        <SaveIcon className="h-4 w-4" />
                                        Salvando...
                                    </>
                                )
                                : patient
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
}

export default UpsertPatientForm;