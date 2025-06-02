import { CalendarIcon, DollarSignIcon, UserRoundIcon, UsersIcon } from "lucide-react";

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
    const formattedRevenue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format((totalRevenue || 0) / 100);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-4 flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-2">
                        <DollarSignIcon className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-muted-foreground">Faturamento</span>
                    </div>
                    <span className="text-xl font-bold">
                        {formattedRevenue}
                    </span>
                </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-4 flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-2">
                        <CalendarIcon className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-muted-foreground">Agendamentos</span>
                    </div>
                    <span className="text-xl font-bold">
                        {totalAppointments}
                    </span>
                </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-4 flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-2">
                        <UsersIcon className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-muted-foreground">Pacientes</span>
                    </div>
                    <span className="text-xl font-bold">
                        {totalPatients}
                    </span>
                </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-4 flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-2">
                        <UserRoundIcon className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-muted-foreground">Médicos</span>
                    </div>
                    <span className="text-xl font-bold">
                        {totalDoctors}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;