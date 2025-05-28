import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container"

const DoctorsPage = () => {
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Médicos</PageTitle>
                    <PageDescription>Gerencie os médicos da sua clínica.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <Button>
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