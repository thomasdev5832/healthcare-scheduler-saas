import {
    Activity,
    Baby,
    Bone,
    Brain,
    CalendarDays,
    Ear,
    Eye,
    Hand,
    Heart,
    Hospital,
    Pill,
    Scissors,
    Stethoscope,
    Syringe,
    TestTube,
    Utensils,
} from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TopSpecialtiesProps {
    topSpecialties: {
        specialty: string;
        appointments: number;
    }[];
}

const getSpecialtyIcon = (specialty: string) => {
    // Normalizar o texto para comparação
    const specialtyLower = specialty.toLowerCase().trim();

    // Verificar termos mais específicos primeiro
    if (specialtyLower.includes("cardiolog") || specialtyLower.includes("coração")) return Heart;
    if (specialtyLower.includes("ginecolog") || specialtyLower.includes("obstetri") || specialtyLower.includes("reprodução")) return Baby;
    if (specialtyLower.includes("pediatr") || specialtyLower.includes("infantil")) return Activity;
    if (specialtyLower.includes("dermatolog") || specialtyLower.includes("pele")) return Hand;
    if (specialtyLower.includes("ortoped") || specialtyLower.includes("traumatolog") || specialtyLower.includes("osso")) return Bone;
    if (specialtyLower.includes("oftalmolog") || specialtyLower.includes("ocul") || specialtyLower.includes("olho")) return Eye;
    if (specialtyLower.includes("neurolog") || specialtyLower.includes("cereb") || specialtyLower.includes("neuro")) return Brain;
    if (specialtyLower.includes("pneumolog") || specialtyLower.includes("respirat") || specialtyLower.includes("pulmão") || specialtyLower.includes("pulmona")) return Activity;
    if (specialtyLower.includes("otorrinolaring") || specialtyLower.includes("ouvido") || specialtyLower.includes("nariz") || specialtyLower.includes("garganta")) return Ear;
    if (specialtyLower.includes("odontolog") || specialtyLower.includes("dentista") || specialtyLower.includes("dente")) return Syringe;
    if (specialtyLower.includes("cirurg") || specialtyLower.includes("cirurgi")) return Scissors;
    if (specialtyLower.includes("endocrinolog") || specialtyLower.includes("hormon")) return Pill;
    if (specialtyLower.includes("patolog") || specialtyLower.includes("laborator")) return TestTube;
    if (specialtyLower.includes("gastr")) return Utensils;

    // Caso padrão para especialidades não mapeadas
    return Stethoscope;
};

export default function TopSpecialties({
    topSpecialties,
}: TopSpecialtiesProps) {
    const maxAppointments = Math.max(
        ...topSpecialties.map((i) => i.appointments),
    );
    const totalAppointments = topSpecialties.reduce((acc, curr) => acc + curr.appointments, 0);
    return (
        <Card className="mx-auto w-full">
            <CardContent className="pb-4">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Hospital className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-sm">Especialidades</CardTitle>
                    </div>
                </div>
                <TooltipProvider>
                    <div className="space-y-3">
                        {topSpecialties.map((specialty) => {
                            const Icon = getSpecialtyIcon(specialty.specialty);
                            const progressValue =
                                (specialty.appointments / maxAppointments) * 100;
                            const percentOfTotal = ((specialty.appointments / totalAppointments) * 100).toFixed(1);
                            return (
                                <Tooltip key={specialty.specialty}>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-3 cursor-pointer">
                                            <div className="bg-primary/10 flex h-7 w-7 items-center justify-center rounded-full">
                                                <Icon className="text-primary h-4 w-4" />
                                            </div>
                                            <div className="flex w-full flex-col justify-center gap-0.5">
                                                <div className="flex w-full justify-between items-center">
                                                    <h3 className="text-xs font-medium truncate max-w-[8rem]">{specialty.specialty}</h3>
                                                    <div className="text-right flex items-center gap-1 min-w-[4.5rem] justify-end">
                                                        <span className="text-muted-foreground text-xs flex items-center gap-1">
                                                            {specialty.appointments} <CalendarDays className="h-3 w-3" />
                                                        </span>
                                                        <span className="ml-1 text-xs text-primary font-semibold">{percentOfTotal}%</span>
                                                    </div>
                                                </div>
                                                <Progress value={progressValue} className="w-full h-1" />
                                            </div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium">{specialty.specialty}</span>
                                            <span>Agendamentos: {specialty.appointments}</span>
                                            <span>Participação: {percentOfTotal}%</span>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </div>
                </TooltipProvider>
            </CardContent>
        </Card>
    );
}