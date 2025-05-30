"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Edit2Icon, Grip, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { patientsTable } from "@/db/schema"

type Patient = typeof patientsTable.$inferSelect;

export const patientsTableColumns: ColumnDef<Patient>[] = [
    {
        id: "name",
        accessorKey: "name",
        header: "Nome",
    },
    {
        id: "email",
        accessorKey: "email",
        header: "Email",
    },
    {
        id: "phoneNumber",
        accessorKey: "phoneNumber",
        header: "Telefone",
        cell: (params) => {
            const phoneNumber = params.row.original.phoneNumber;
            if (!phoneNumber) return "-";
            // Using regex to format phone number as (XX) XXXXX-XXXX
            const formattedNumber = phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
            return formattedNumber;
        }
    },
    {
        id: "sex",
        accessorKey: "sex",
        header: "Sexo",
        cell: (params) => {
            const patient = params.row.original
            return patient.sex === "male" ? "Masculino" : "Feminino"
        }
    },
    {
        id: "actions",
        cell: (params) => {
            const patient = params.row.original
            return (
                <DropdownMenu>

                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Grip className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel className="text-xs font-medium">{patient.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            <Edit2Icon className="w-4 h-4" />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Trash2Icon className="w-4 h-4" />
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            )
        }
    }
]
