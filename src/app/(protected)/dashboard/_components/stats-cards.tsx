"use client";

import { CalendarDays, DollarSignIcon, EyeIcon, EyeOffIcon, Stethoscope, UsersIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface StatsCardsProps {
    totalRevenue: number | null;
    totalAppointments: number;
    totalPatients: number;
    totalDoctors: number;
}

const StatsCards = ({
    totalRevenue = 0,
    totalAppointments = 0,
    totalPatients = 0,
    totalDoctors = 0
}: StatsCardsProps) => {
    const [showRevenue, setShowRevenue] = useState(true);

    const formattedRevenue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format((totalRevenue || 0) / 100);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-4 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-x-2">
                            <DollarSignIcon className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-muted-foreground">Faturamento</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => setShowRevenue(!showRevenue)}
                        >
                            {showRevenue ? (
                                <EyeOffIcon />
                            ) : (
                                <EyeIcon />
                            )}
                            <span className="sr-only">
                                {showRevenue ? "Esconder faturamento" : "Mostrar faturamento"}
                            </span>
                        </Button>
                    </div>
                    <div className="mt-auto">
                        <span className="text-xl font-bold">
                            {showRevenue ? formattedRevenue : "******"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-4 flex flex-col h-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <CalendarDays className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-muted-foreground">Agendamentos</span>
                        </div>
                        <div className="w-8"></div>
                    </div>
                    <div className="mt-auto">
                        <span className="text-xl font-bold">
                            {totalAppointments}
                        </span>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-4 flex flex-col h-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <UsersIcon className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-muted-foreground">Pacientes</span>
                        </div>
                        <div className="w-8"></div>
                    </div>
                    <div className="mt-auto">
                        <span className="text-xl font-bold">
                            {totalPatients}
                        </span>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-4 flex flex-col h-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <Stethoscope className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-muted-foreground">Médicos</span>
                        </div>
                        <div className="w-8"></div>
                    </div>
                    <div className="mt-auto">
                        <span className="text-xl font-bold">
                            {totalDoctors}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;