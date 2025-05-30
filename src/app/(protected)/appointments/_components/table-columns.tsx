"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, CircleDollarSign, Clock } from "lucide-react";

import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";

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