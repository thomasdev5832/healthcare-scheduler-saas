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
    return (
        <Card className="mx-auto w-full">
            <CardContent>
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Hospital className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-sm">Especialidades</CardTitle>
                    </div>
                </div>

                {/* specialtys List */}
                <div className="space-y-4">
                    {topSpecialties.map((specialty) => {
                        const Icon = getSpecialtyIcon(specialty.specialty);
                        // Porcentagem de ocupação da especialidade baseando-se no maior número de agendamentos
                        const progressValue =
                            (specialty.appointments / maxAppointments) * 100;

                        return (
                            <div
                                key={specialty.specialty}
                                className="flex items-center gap-2"
                            >
                                <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                                    <Icon className="text-primary h-4 w-4" />
                                </div>
                                <div className="flex w-full flex-col justify-center gap-1">
                                    <div className="flex w-full justify-between">
                                        <h3 className="text-xs font-medium">{specialty.specialty}</h3>
                                        <div className="text-right">
                                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                                {specialty.appointments} <CalendarDays className="h-3 w-3" />
                                            </span>
                                        </div>
                                    </div>
                                    <Progress value={progressValue} className="w-full h-1.5" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}