"use client";

import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
    date: string | undefined; // Valor atual do filtro de data (formato YYYY-MM-DD)
    onDateChange: (date: string | undefined) => void; // Função para atualizar o filtro
    label?: string; // Rótulo customizável
}

export function DatePicker({ date, onDateChange, label = "Data" }: DatePickerProps) {
    const [open, setOpen] = React.useState(false);

    // Função para criar Date no fuso horário local a partir de YYYY-MM-DD
    const parseLocalDate = (dateString: string): Date | undefined => {
        if (!dateString || isNaN(new Date(dateString).getTime())) return undefined;
        const [year, month, day] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day); // month é base 0
    };

    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
        date ? parseLocalDate(date) : undefined
    );

    // Sincronizar o estado interno com a prop date
    React.useEffect(() => {
        const newSelectedDate = date ? parseLocalDate(date) : undefined;
        setSelectedDate(newSelectedDate);
    }, [date]);

    const handleSelect = (newDate: Date | undefined) => {
        setSelectedDate(newDate);
        const formattedDate = newDate
            ? `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`
            : undefined;
        onDateChange(formattedDate);
        setOpen(false);
    };

    const handleClearDate = () => {
        setSelectedDate(undefined);
        onDateChange(undefined);
    };

    // Formatar a data para exibição no formato DD/MM/YYYY ou "Todos os dias"
    const displayDate = selectedDate
        ? selectedDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        : "Todos os dias";

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                {label}
            </Label>
            <div className="flex items-center gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date"
                            className="justify-between font-normal w-48"
                        >
                            <div className="flex items-center">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {displayDate}
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto flex flex-col items-center overflow-hidden p-0" align="center">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            captionLayout="dropdown"
                            onSelect={handleSelect}
                            locale={ptBR}
                        />
                        <Button
                            variant="outline"
                            onClick={handleClearDate}
                            aria-label="Selecionar todos os dias"
                            className="h-fit mb-2 w-fit"
                        >
                            Todos os dias
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}