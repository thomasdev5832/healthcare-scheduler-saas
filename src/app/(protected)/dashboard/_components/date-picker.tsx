"use client"

import { ptBR } from "date-fns/locale"
import dayjs from "dayjs"
import { CalendarIcon } from "lucide-react"
import { parseAsIsoDate, useQueryState } from "nuqs"
import * as React from "react"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function DatePicker({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    // Garantir que os valores iniciais sejam válidos
    const today = new Date()
    const currentMonth = dayjs(today).startOf('month').toDate()
    const nextMonth = dayjs(today).endOf('month').toDate()

    const [from, setFrom] = useQueryState(
        "from",
        parseAsIsoDate.withDefault(currentMonth)
    )

    const [to, setTo] = useQueryState(
        "to",
        parseAsIsoDate.withDefault(nextMonth)
    )

    const handleDateSelect = (dateRange: DateRange | undefined) => {
        try {
            if (dateRange?.from) {
                // Verificar se a data é válida antes de atualizar
                if (!isNaN(dateRange.from.getTime())) {
                    setFrom(dateRange.from, {
                        shallow: false,
                    });
                }
            }

            if (dateRange?.to) {
                // Verificar se a data é válida antes de atualizar
                if (!isNaN(dateRange.to.getTime())) {
                    setTo(dateRange.to, {
                        shallow: false,
                    });
                }
            }
        } catch (error) {
            console.error("Erro ao processar datas:", error);
        }
    }

    // Garantir que as datas do objeto são válidas
    const date = {
        from: from && !isNaN(new Date(from).getTime()) ? from : currentMonth,
        to: to && !isNaN(new Date(to).getTime()) ? to : nextMonth,
    }

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {dayjs(date.from).format("DD/MM/YYYY")} -{" "}
                                    {dayjs(date.to).format("DD/MM/YYYY")}
                                </>
                            ) : (
                                dayjs(date.from).format('DD/MM/YYYY')
                            )
                        ) : (
                            <span>Selecione uma data</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateSelect}
                        numberOfMonths={2}
                        locale={ptBR}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
