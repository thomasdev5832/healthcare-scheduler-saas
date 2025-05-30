import { Grip } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

type PatientsPageActionsProps = {
    patient: typeof patientsTable.$inferSelect;
}

const PatientsPageActions = ({ patient }: PatientsPageActionsProps) => {
    const [upsertDialogIsOpen, setUpsertDialogIsOpen] = useState(false);

    return (
        <Dialog open={upsertDialogIsOpen} onOpenChange={setUpsertDialogIsOpen}>
            <Button className="cursor-pointer" variant="ghost" size="icon" onClick={() => setUpsertDialogIsOpen(true)}>
                <Grip className="w-4 h-4" />
            </Button>
            <UpsertPatientForm isOpen={upsertDialogIsOpen} patient={patient} onSuccess={() => setUpsertDialogIsOpen(false)} />
        </Dialog>
    )
}

export default PatientsPageActions;