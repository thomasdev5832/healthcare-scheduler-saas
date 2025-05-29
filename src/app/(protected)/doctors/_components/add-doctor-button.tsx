"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertDoctorForm from "./upsert-doctor-form";

const AddDoctorButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">
                    <Plus className="h-4 w-4" />
                    Adicionar Médico
                </Button>
            </DialogTrigger>
            <UpsertDoctorForm />
        </Dialog>
    );
}

export default AddDoctorButton;