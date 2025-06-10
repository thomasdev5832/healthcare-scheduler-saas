import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "./_components/subscription-plan";
import { SubscriptionPremiumPlan } from "./_components/subscription-premium-plan";

const SubscriptionPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        redirect("/login");
    }
    if (!session.user.clinic) {
        redirect("/clinic-form");
    }
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Planos de Assinatura</PageTitle>
                    <PageDescription>Encontre a solução ideal e administre sua assinatura de forma simples e segura.</PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <div className="flex flex-row gap-4">
                    <SubscriptionPlan
                        className="w-[350px]"
                        active={session.user.plan === "essential"}
                        userEmail={session.user.email}
                    />
                    <SubscriptionPremiumPlan
                        className="w-[350px]"
                        active={session.user.plan === "premium"}
                        userEmail={session.user.email}
                    />
                </div>
                <div className="mt-8">
                    <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
                            Precisa de Ajuda?
                        </h3>
                        <p className="text-gray-600 text-base mb-6 text-center">
                            Nossa equipe especializada está pronta para oferecer suporte com planos, assinaturas ou funcionalidades. Entre em contato de forma rápida e segura.
                        </p>
                        <Link className="bg-primary text-muted hover:bg-primary/90 px-10 py-3 rounded-lg" href={"/support"} >Suporte Premium</Link>
                    </div>
                </div>
            </PageContent>
        </PageContainer>
    );
};

export default SubscriptionPage;