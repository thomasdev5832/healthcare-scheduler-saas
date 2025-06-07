"use client";

import { CalendarDays, DollarSignIcon, EyeIcon, EyeOffIcon, Stethoscope, UsersIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface StatsCardsProps {
    totalRevenue: number | null;
    totalAppointments: number;
    totalPatients: number;
    totalDoctors: number;
    totalAppointmentsCompleted: number;
}

const StatsCards = ({
    totalRevenue = 0,
    totalAppointments = 0,
    totalPatients = 0,
    totalDoctors = 0,
    totalAppointmentsCompleted = 0
}: StatsCardsProps) => {
    const [showRevenue, setShowRevenue] = useState(true);
    const [showAppointments, setShowAppointments] = useState(true);
    const [showPatients, setShowPatients] = useState(true);
    const [showDoctors, setShowDoctors] = useState(true);


    const formattedRevenue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format((totalRevenue || 0) / 100);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6 flex flex-col h-full gap-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-3">
                            <DollarSignIcon className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-medium text-muted-foreground">Faturamento</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowRevenue(!showRevenue)}
                            aria-label={showRevenue ? "Esconder faturamento" : "Mostrar faturamento"}
                        >
                            {showRevenue ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </Button>
                    </div>
                    <div className="mt-auto">
                        <span className="text-2xl font-semibold">
                            {showRevenue ? formattedRevenue : "********"}
                        </span>
                    </div>
                </div>
            </div>

            <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200"
                aria-label="Resumo de Agendamentos"
            >
                <div className="p-6 flex flex-col h-full group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-x-3">
                            <CalendarDays className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                                Agendamentos
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowAppointments(!showAppointments)}
                            aria-label={showAppointments ? "Esconder agendamentos" : "Mostrar agendamentos"}
                        >
                            {showAppointments ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
                        <span className="flex items-center gap-1">
                            <span className="text-muted-foreground font-medium">Agendados:</span>
                            <span className="text-lg font-semibold text-foreground">
                                {showAppointments ? totalAppointments : "**"}
                            </span>
                        </span>
                        <span className="hidden sm:inline text-muted-foreground/60">|</span>
                        <span className="flex items-center gap-1">
                            <span className="text-muted-foreground font-medium">Concluídos:</span>
                            <span className="text-2xl font-semibold text-primary dark:text-blue-400">
                                {showAppointments ? totalAppointmentsCompleted : "**"}
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-3">
                            <UsersIcon className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-medium text-muted-foreground">Pacientes</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPatients(!showPatients)}
                            aria-label={showPatients ? "Esconder pacientes" : "Mostrar pacientes"}
                        >
                            {showPatients ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </Button>
                    </div>
                    <div className="mt-auto">
                        <span className="text-2xl font-semibold">
                            {showPatients ? totalPatients : "****"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-3">
                            <Stethoscope className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-medium text-muted-foreground">Médicos</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowDoctors(!showDoctors)}
                            aria-label={showDoctors ? "Esconder médicos" : "Mostrar médicos"}
                        >
                            {showDoctors ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </Button>
                    </div>
                    <div className="mt-auto">
                        <span className="text-2xl font-semibold">
                            {showDoctors ? totalDoctors : "***"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;