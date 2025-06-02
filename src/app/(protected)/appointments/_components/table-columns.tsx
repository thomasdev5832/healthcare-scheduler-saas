"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AlertCircle, CalendarDays, CheckCircle2, CircleDollarSign, Clock, Clock2, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";
import { cn } from "@/lib/utils";

import AppointmentsPageActions from "./table-actions";

// Criamos um tipo que inclui as relações para facilitar a tipagem
type Appointment = typeof appointmentsTable.$inferSelect & {
    doctor: typeof doctorsTable.$inferSelect;
    patient: typeof patientsTable.$inferSelect;
};

export const appointmentsTableColumns: ColumnDef<Appointment>[] = [
    {
        id: "date",
        accessorKey: "date",
        header: "Data",
        cell: (params) => {
            const date = params.row.original.date;
            const formattedDate = format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const dateObj = new Date(date);
            dateObj.setHours(0, 0, 0, 0);

            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            // Adiciona indicadores visuais para hoje e amanhã
            let dateLabel = formattedDate;
            let badgeClass = "bg-muted text-muted-foreground";

            if (dateObj.getTime() === today.getTime()) {
                dateLabel = "Hoje";
                badgeClass = "bg-primary text-primary-foreground";
            } else if (dateObj.getTime() === tomorrow.getTime()) {
                dateLabel = "Amanhã";
                badgeClass = "bg-secondary text-secondary-foreground";
            }

            return (
                <div className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col">
                        <span>{format(new Date(date), "dd/MM/yyyy", { locale: ptBR })}</span>
                        {(dateLabel === "Hoje" || dateLabel === "Amanhã") && (
                            <span className={`text-xs px-1.5 py-0.5 rounded-sm font-medium ${badgeClass}`}>
                                {dateLabel}
                            </span>
                        )}
                    </div>
                </div>
            );
        }
    },
    {
        id: "time",
        accessorKey: "date",
        header: "Horário",
        cell: (params) => {
            const date = params.row.original.date;
            const appointmentTime = new Date(date);
            const now = new Date();
            const isPast = appointmentTime < now;
            const isNext = !isPast && (appointmentTime.getTime() - now.getTime() < 60 * 60 * 1000); // Próxima hora

            let timeClass = "text-foreground";
            if (isPast) {
                timeClass = "text-muted-foreground line-through";
            } else if (isNext) {
                timeClass = "text-green-600 font-medium";
            }

            return (
                <div className="flex items-center">
                    <Clock className={`mr-2 h-4 w-4 ${isPast ? 'text-muted-foreground' : (isNext ? 'text-green-600' : 'text-muted-foreground')}`} />
                    <span className={timeClass}>{format(new Date(date), "HH:mm", { locale: ptBR })}</span>
                </div>
            );
        }
    },
    {
        id: "patient",
        accessorKey: "patient.name",
        header: "Paciente",
    },
    {
        id: "doctor",
        accessorKey: "doctor.name",
        header: "Médico",
        cell: (params) => {
            const doctor = params.row.original.doctor;
            return (
                <div>
                    <div>{doctor.name}</div>
                    <div className="text-xs text-muted-foreground">{doctor.specialty}</div>
                </div>
            );
        }
    },
    {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: (params) => {
            const status = params.row.original.status;

            const statusConfig = {
                scheduled: {
                    label: "Agendado",
                    icon: Clock2,
                    variant: "outline" as const,
                    className: "border-primary/50 bg-primary/10 text-blue-400"
                },
                completed: {
                    label: "Concluído",
                    icon: CheckCircle2,
                    variant: "outline" as const,
                    className: "border-green-300 bg-green-100 text-green-600"
                },
                canceled: {
                    label: "Cancelado",
                    icon: XCircle,
                    variant: "outline" as const,
                    className: "border-red-200 bg-red-100 text-red-600"
                },
                no_show: {
                    label: "Não Compareceu",
                    icon: AlertCircle,
                    variant: "outline" as const,
                    className: "border-amber-200 bg-amber-100 text-amber-600"
                }
            };

            const config = statusConfig[status] || statusConfig.scheduled;
            const Icon = config.icon;

            return (
                <div className="flex items-center">
                    <Badge
                        variant={config.variant}
                        className={cn("flex items-center gap-1", config.className)}
                    >
                        <Icon className={cn("h-3 w-3", {
                            "text-primary": status === "scheduled",
                            "text-green-600": status === "completed",
                            "text-destructive": status === "canceled",
                            "text-amber-600": status === "no_show"
                        })} />
                        <span>{config.label}</span>
                    </Badge>
                </div>
            );
        }
    },
    {
        id: "appointmentPrice",
        accessorKey: "appointmentPriceInCents",
        header: "Valor",
        cell: (params) => {
            const price = params.row.original.appointmentPriceInCents;
            return (
                <div className="flex items-center">
                    <CircleDollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                    {formatCurrencyInCents(price)}
                </div>
            );
        }
    },
    {
        id: "actions",
        cell: (params) => {
            const appointment = params.row.original;
            return (
                <AppointmentsPageActions appointment={appointment} />
            );
        }
    }
]; 