import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/ui/page-container";

const SubscriptionsPage = async () => {
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Assinatura</PageTitle>
                    <PageDescription>Gerencie a sua assinatura.</PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>

                <div className="space-y-4">
                    <p>Detalhes da assinatura serão exibidos aqui.</p>
                    {/* Aqui você pode adicionar mais componentes ou informações sobre a assinatura */}
                </div>
            </PageContent>


        </PageContainer>
    );
}
export default SubscriptionsPage;