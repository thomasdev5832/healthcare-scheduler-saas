"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertPatientForm from "./upsert-patient-form";

const AddPatientButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4" />
                    Adicionar Paciente
                </Button>
            </DialogTrigger>
            <UpsertPatientForm onSuccess={() => setIsOpen(false)} isOpen={isOpen} />
        </Dialog>
    );
}

export default AddPatientButton;