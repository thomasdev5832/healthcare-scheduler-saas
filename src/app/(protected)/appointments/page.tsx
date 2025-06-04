import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddAppointmentButton from "./_components/add-appointment-button";
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

    if (!session.user.plan) {
        redirect("/new-subscription");
    }

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
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Agendamentos</PageTitle>
                    <PageDescription>Gerencie os agendamentos da sua clínica.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <AddAppointmentButton doctors={doctors} patients={patients} />
                </PageActions>
            </PageHeader>
            <PageContent>
                {appointments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <p className="text-muted-foreground text-lg">Nenhum agendamento cadastrado.</p>
                    </div>
                ) : (
                    <DataTable columns={appointmentsTableColumns} data={appointments} />
                )}
            </PageContent>
        </PageContainer>
    );
};

export default AppointmentsPage; 