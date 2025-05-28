import { Plus } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container"
import { auth } from "@/lib/auth";

const DoctorsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        redirect("/authentication");
    }
    if (!session.user.clinic) {
        redirect("/clinic-form");
    }

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Médicos</PageTitle>
                    <PageDescription>Gerencie os médicos da sua clínica.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <Button className="cursor-pointer">
                        <Plus />
                        Adicionar Médico
                    </Button>
                </PageActions>
            </PageHeader>
            <PageContent>
                {/* Content goes here, e.g., a list of doctors or a table */}
                <p>Lista de médicos será exibida aqui.</p>
            </PageContent>
        </PageContainer>
    );
}
export default DoctorsPage;