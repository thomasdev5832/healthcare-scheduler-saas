"use client";

import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, CheckCircle2, Clock2, Edit, Grip, XCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

import { updateAppointmentStatus } from "@/actions/update-appointment-status";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { appointmentKeys } from "@/hooks/appointments";
import { cn } from "@/lib/utils";

import UpsertAppointmentForm from "./upsert-appointment-form";

type Appointment = typeof appointmentsTable.$inferSelect & {
    doctor: typeof doctorsTable.$inferSelect;
    patient: typeof patientsTable.$inferSelect;
};

type AppointmentStatus = "scheduled" | "completed" | "canceled" | "no_show";

interface AppointmentsPageActionsProps {
    appointment: Appointment;
}

const AppointmentsPageActions = ({ appointment }: AppointmentsPageActionsProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const { execute: executeUpdateStatus, isExecuting } = useAction(updateAppointmentStatus, {
        onSuccess: ({ input }) => {
            // Invalida as queries para atualizar a interface
            queryClient.invalidateQueries({ queryKey: appointmentKeys.all });

            const statusMessages: Record<AppointmentStatus, string> = {
                scheduled: "O agendamento foi marcado como agendado.",
                completed: "O agendamento foi concluído com sucesso.",
                canceled: "O agendamento foi cancelado.",
                no_show: "O paciente não compareceu ao agendamento."
            };

            toast(
                <div className="flex items-center gap-2">
                    {React.createElement(statusConfig[input.status].icon, {
                        className: cn("h-5 w-5", statusConfig[input.status].className)
                    })}
                    <span className={cn("font-medium", statusConfig[input.status].className)}>
                        {statusConfig[input.status].label}
                    </span>
                </div>,
                {
                    description: statusMessages[input.status],
                    className: statusConfig[input.status].className
                }
            );
        },
        onError: () => {
            toast.error("Não foi possível alterar o status.", {
                description: "Verifique se o médico está disponível no horário selecionado.",
            });
        }
    });

    const handleStatusUpdate = async (status: AppointmentStatus) => {
        await executeUpdateStatus({
            id: appointment.id,
            status
        });
    };

    const statusConfig = {
        scheduled: {
            label: "Agendado",
            icon: Clock2,
            className: "text-primary" // alterado para azul primary
        },
        completed: {
            label: "Concluído",
            icon: CheckCircle2,
            className: "text-green-500"
        },
        canceled: {
            label: "Cancelado",
            icon: XCircle,
            className: "text-destructive"
        },
        no_show: {
            label: "Não Compareceu",
            icon: AlertCircle,
            className: "text-amber-500"
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer" variant="ghost" size="icon" disabled={isExecuting}>
                        <Grip className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">

                    <DropdownMenuItem
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer"
                        disabled={isExecuting}
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar agendamento
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Alterar Status</DropdownMenuLabel>
                    {Object.entries(statusConfig).map(([status, config]) => {
                        const StatusIcon = config.icon;
                        const isCurrentStatus = appointment.status === status;

                        return (
                            <DropdownMenuItem
                                key={status}
                                disabled={isCurrentStatus || isExecuting}
                                className={cn(
                                    "flex items-center gap-2 cursor-pointer",
                                    isCurrentStatus && "font-medium",
                                    isExecuting && "opacity-50"
                                )}
                                onClick={() => handleStatusUpdate(status as AppointmentStatus)}
                            >
                                <StatusIcon className={cn("h-4 w-4", config.className)} />
                                {config.label}
                                {isCurrentStatus && " (atual)"}
                            </DropdownMenuItem>
                        );
                    })}

                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <UpsertAppointmentForm
                    appointment={appointment}
                    doctors={[appointment.doctor]}
                    patients={[appointment.patient]}
                    onSuccess={() => setIsOpen(false)}
                    isOpen={isOpen}
                />
            </Dialog>
        </>
    );
};

export default AppointmentsPageActions;