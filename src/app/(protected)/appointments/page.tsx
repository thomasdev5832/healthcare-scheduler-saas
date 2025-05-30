import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { db } from "@/db";
import { doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddAppointmentButton from "./_components/add-appointment-button";

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

    const patients = await db.query.patientsTable.findMany({
        where: eq(patientsTable.clinicId, session.user.clinic.id),
    });

    const doctors = await db.query.doctorsTable.findMany({
        where: eq(doctorsTable.clinicId, session.user.clinic.id),
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
                {/* Listagem de agendamentos será implementada posteriormente */}
                <div className="flex flex-col items-center justify-center py-10">
                    <p className="text-muted-foreground text-lg">A listagem de agendamentos será implementada posteriormente.</p>
                </div>
            </PageContent>
        </PageContainer>
    );
};

export default AppointmentsPage; 