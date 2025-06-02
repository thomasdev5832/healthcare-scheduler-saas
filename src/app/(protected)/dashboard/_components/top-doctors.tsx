import { CalendarDays, Stethoscope } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

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
    return (
        <Card className="mx-auto w-full">
            <CardContent>
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-sm">Médicos</CardTitle>
                    </div>
                    <Link href="/doctors" className="text-xs text-muted-foreground hover:underline">
                        Ver todos
                    </Link>
                </div>

                {/* Doctors List */}
                <div className="space-y-4">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-gray-100 text-xs font-medium text-gray-600">
                                        {doctor.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-xs font-medium">{doctor.name}</h3>
                                    <p className="text-muted-foreground text-xs">
                                        {doctor.specialty}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-muted-foreground text-xs flex items-center gap-1">
                                    {doctor.appointments} <CalendarDays className="h-3 w-3" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}