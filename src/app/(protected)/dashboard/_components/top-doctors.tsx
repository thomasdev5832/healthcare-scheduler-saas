import { CalendarDays, Lightbulb, Stethoscope } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TopDoctorsProps {
    doctors: {
        id: string;
        name: string;
        avatarImageUrl: string | null;
        specialty: string;
        appointments: number;
    }[];
}

export default function TopDoctors({ doctors }: TopDoctorsProps) {
    // Ordena os médicos por número de agendamentos (decrescente) e pega os 10 primeiros
    const topDoctors = [...doctors].sort((a, b) => b.appointments - a.appointments).slice(0, 10);
    const maxAppointments = Math.max(...topDoctors.map((d) => d.appointments));
    const totalAppointments = topDoctors.reduce((acc, curr) => acc + curr.appointments, 0);
    return (
        <Card className="mx-auto w-full">
            <CardContent className="pb-4">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-sm">Médicos</CardTitle>
                    </div>
                    <Link href="/doctors" className="text-xs text-muted-foreground hover:underline">
                        Ver todos
                    </Link>
                </div>
                {/* Doctors List */}
                <div className="space-y-3">
                    <TooltipProvider>
                        {topDoctors.map((doctor) => {
                            const percentOfTotal = ((doctor.appointments / totalAppointments) * 100).toFixed(1);
                            const progressValue = (doctor.appointments / maxAppointments) * 100;
                            return (
                                <div key={doctor.id} className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Avatar className="h-7 w-7">
                                            <AvatarFallback className="bg-gray-100 text-xs font-medium text-gray-600">
                                                {doctor.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0">
                                            <h3 className="text-xs font-medium truncate max-w-[8rem]">{doctor.name}</h3>
                                            <p className="text-muted-foreground text-xs truncate max-w-[8rem]">
                                                {doctor.specialty}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end min-w-[5.5rem]">
                                        <span className="text-muted-foreground text-xs flex items-center gap-1">
                                            {doctor.appointments} <CalendarDays className="h-3 w-3" />
                                        </span>
                                        <span className="text-primary text-xs font-semibold">{percentOfTotal}%</span>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="w-20 mt-1 cursor-pointer">
                                                    <div className="bg-primary/10 rounded-full h-1">
                                                        <div
                                                            className="bg-primary rounded-full h-1"
                                                            style={{ width: `${progressValue}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <div className="flex flex-col gap-1 min-w-[140px]">
                                                    <span className="font-medium text-xs">{doctor.name}</span>
                                                    <span className="text-xs">Agendamentos: {doctor.appointments}</span>
                                                    <span className="text-xs">Participação: {percentOfTotal}%</span>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            );
                        })}
                    </TooltipProvider>
                </div>
                {/* Insights Section */}
                <div className="mt-5 border-t pt-3">
                    <h4 className="text-xs font-semibold mb-2 text-muted-foreground flex items-center gap-1">
                        <Lightbulb className="h-3.5 w-3.5 text-primary" /> Insights
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                        <li>
                            <span className="font-medium text-primary">
                                {doctors[0]?.name || "-"}
                            </span>{" "}
                            é o médico com mais agendamentos ({doctors[0]?.appointments || 0}).
                        </li>
                        <li>
                            Média de agendamentos por médico: {Math.round(totalAppointments / (doctors.length || 1))}
                        </li>
                        <li>
                            Total de agendamentos: {totalAppointments}
                        </li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}