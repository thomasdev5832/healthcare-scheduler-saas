"use client"

import dayjs from "dayjs"
import { DollarSign } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { formatCurrencyInCents } from "@/helpers/currency";

interface RevenueChartProps {
    dailyAppointmentsData: {
        date: string;
        appointments: number;
        revenue: number;
    }[];
}

export function AppointmentsChart({ dailyAppointmentsData }: RevenueChartProps) {
    const chartDays = Array.from({ length: 21 }).map((_, i) =>
        dayjs()
            .subtract(10 - i, "days")
            .format("YYYY-MM-DD"),
    );

    const chartData = chartDays.map((date) => {
        const dataForDay = dailyAppointmentsData.find((item) => item.date === date);
        return {
            date: dayjs(date).format("DD/MM"),
            fullDate: date,
            appointments: dataForDay?.appointments || 0,
            revenue: Number(dataForDay?.revenue || 0),
        };
    });

    const chartConfig = {
        appointments: {
            label: "Agendamentos",
            color: "#0B68F7",
        },
        revenue: {
            label: "Faturamento",
            color: "#10B981",
        },
    } satisfies ChartConfig;

    // Calcular faturamento total e média apenas para os dias exibidos no gráfico
    const chartRevenueTotal = chartData.reduce((acc, d) => acc + d.revenue, 0);
    const chartRevenueAvg = chartData.length > 0 ? chartRevenueTotal / chartData.length : 0;
    // Calcular maior número de agendamentos e média diária para os dias exibidos
    const chartAppointmentsMax = Math.max(...chartData.map(d => d.appointments));
    const chartAppointmentsAvg = chartData.length > 0 ? chartData.reduce((acc, d) => acc + d.appointments, 0) / chartData.length : 0;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-md font-semibold">Agendamentos e Faturamento</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px]">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis
                            yAxisId="left"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => formatCurrencyInCents(value)}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    formatter={(value, name) => {
                                        if (name === "revenue") {
                                            return (
                                                <>
                                                    <div className="h-3 w-3 rounded bg-[#10B981]" />
                                                    <span className="text-muted-foreground">
                                                        Faturamento:
                                                    </span>
                                                    <span className="font-semibold">
                                                        {formatCurrencyInCents(Number(value))}
                                                    </span>
                                                </>
                                            );
                                        }
                                        return (
                                            <>
                                                <div className="h-3 w-3 rounded bg-[#0B68F7]" />
                                                <span className="text-muted-foreground">
                                                    Agendamentos:
                                                </span>
                                                <span className="font-semibold">{value}</span>
                                            </>
                                        );
                                    }}
                                    labelFormatter={(label, payload) => {
                                        if (payload && payload[0]) {
                                            const date = dayjs(payload[0].payload?.fullDate);
                                            const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
                                            const weekday = weekdays[date.day()];
                                            return `${date.format("DD/MM/YYYY")} (${weekday})`;
                                        }
                                        return label;
                                    }}
                                />
                            }
                        />
                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="appointments"
                            stroke="var(--color-appointments)"
                            fill="var(--color-appointments)"
                            fillOpacity={0.2}
                            strokeWidth={2}
                        />
                        <Area
                            yAxisId="right"
                            type="monotone"
                            dataKey="revenue"
                            stroke="var(--color-revenue)"
                            fill="var(--color-revenue)"
                            fillOpacity={0.2}
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ChartContainer>
                {/* Insights Section */}
                <div className="mt-6 border-t pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Coluna 1: Insights de Agendamentos */}
                    <div>
                        <h4 className="text-xs font-semibold mb-2 text-muted-foreground flex items-center gap-1">
                            <DollarSign className="h-3.5 w-3.5 text-primary" /> Insights de Agendamentos
                        </h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                            <li>
                                Maior número de agendamentos em um dia: {chartAppointmentsMax}
                            </li>
                            <li>
                                Média diária de agendamentos: {chartAppointmentsAvg.toFixed(1)}
                            </li>
                            <li>
                                Menor número de agendamentos em um dia: {Math.min(...chartData.map(d => d.appointments))}
                            </li>
                            <li>
                                Dias sem agendamentos: {chartData.filter(d => d.appointments === 0).length}
                            </li>
                        </ul>
                    </div>
                    {/* Coluna 2: Insights de Faturamento */}
                    <div>
                        <h4 className="text-xs font-semibold mb-2 text-muted-foreground flex items-center gap-1">
                            <DollarSign className="h-3.5 w-3.5 text-green-600" /> Insights de Faturamento
                        </h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                            <li>
                                Média diária de faturamento: {formatCurrencyInCents(chartRevenueAvg)}
                            </li>
                            <li>
                                Maior faturamento em um dia: {formatCurrencyInCents(Math.max(...chartData.map(d => d.revenue)))}
                            </li>
                            <li>
                                Menor faturamento em um dia: {formatCurrencyInCents(Math.min(...chartData.map(d => d.revenue)))}
                            </li>
                            <li>
                                Dias sem faturamento: {chartData.filter(d => d.revenue === 0).length}
                            </li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
