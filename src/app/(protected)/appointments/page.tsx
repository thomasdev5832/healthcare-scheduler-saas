import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddAppointmentButton from "./_components/add-appointment-button";
import { AppointmentsClient } from "./_components/appointments-client";
import { appointmentsTableColumns } from "./_components/table-columns";

const AppointmentsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/authentication");
    }

    if (!session.user.clinic) {
        redirect("/clinic-form");
    }

    // if (!session.user.plan) {
    //     redirect("/new-subscription");
    // }

    // Busca pacientes e médicos para o botão de adicionar
    const patients = await db.query.patientsTable.findMany({
        where: eq(patientsTable.clinicId, session.user.clinic.id),
    });

    const doctors = await db.query.doctorsTable.findMany({
        where: eq(doctorsTable.clinicId, session.user.clinic.id),
    });

    // Busca agendamentos com relacionamentos para a tabela
    const appointments = await db.query.appointmentsTable.findMany({
        where: eq(appointmentsTable.clinicId, session.user.clinic.id),
        with: {
            doctor: true,
            patient: true,
        },
        orderBy: (fields, { asc }) => [asc(fields.date)],
    });

    return (
        <AppointmentsClient
            patients={patients}
            doctors={doctors}
            appointments={appointments}
            AddAppointmentButton={AddAppointmentButton}
            appointmentsTableColumns={appointmentsTableColumns}
        />
    );
};

export default AppointmentsPage;