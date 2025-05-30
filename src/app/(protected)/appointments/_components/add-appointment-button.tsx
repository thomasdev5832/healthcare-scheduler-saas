"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { doctorsTable, patientsTable } from "@/db/schema";

import UpsertAppointmentForm from "./upsert-appointment-form";

interface AddAppointmentButtonProps {
    doctors: typeof doctorsTable.$inferSelect[];
    patients: typeof patientsTable.$inferSelect[];
}

const AddAppointmentButton = ({ doctors, patients }: AddAppointmentButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4" />
                    Novo Agendamento
                </Button>
            </DialogTrigger>
            <UpsertAppointmentForm
                onSuccess={() => setIsOpen(false)}
                isOpen={isOpen}
                doctors={doctors}
                patients={patients}
            />
        </Dialog>
    );
};

export default AddAppointmentButton; 