"use client";

import { Grip } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";

import UpsertAppointmentForm from "./upsert-appointment-form";

type Appointment = typeof appointmentsTable.$inferSelect & {
    doctor: typeof doctorsTable.$inferSelect;
    patient: typeof patientsTable.$inferSelect;
};

interface AppointmentsPageActionsProps {
    appointment: Appointment;
}

const AppointmentsPageActions = ({ appointment }: AppointmentsPageActionsProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button className="cursor-pointer" variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
                <Grip className="w-4 h-4" />
            </Button>
            <UpsertAppointmentForm appointment={appointment} doctors={[appointment.doctor]} patients={[appointment.patient]} onSuccess={() => setIsOpen(false)} isOpen={isOpen} />
        </Dialog>
    );
};

export default AppointmentsPageActions; 