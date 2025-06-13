import { Headset, Mail } from "lucide-react";
import Link from "next/link";

import LogoAlphon from "@/components/logo-alphon";
import { Button } from "@/components/ui/button";
import { PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";

export default function SupportPage() {
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Suporte</PageTitle>
                    <PageDescription>
                        Nossa equipe especializada está pronta para te ajudar com qualquer dúvida sobre planos, assinaturas, funcionalidades ou uso do sistema.
                    </PageDescription>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <div className="flex flex-col gap-8 max-w-md items-center mx-auto">
                    {/* Seção de Contato */}
                    <div className="flex-1 border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
                        <LogoAlphon />
                        <h3 className="text-2xl font-semibold text-gray-800 my-2 text-center">
                            Como podemos te ajudar?
                        </h3>
                        <p className="text-gray-600 text-base mb-2 text-center">
                            Escolha a melhor forma de entrar em contato e receba suporte personalizado da nossa equipe.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-3 p-4">
                            <Link href="https://wa.link/jg08h7" className="flex-1 w-full">
                                <Button size="lg" variant="default" className="px-8 py-6 text-lg w-full">
                                    <Headset className="h-6 w-6 text-muted" />
                                    Suporte</Button>
                            </Link>
                            <Button
                                variant="default"
                                className="px-8 py-6 text-lg w-full"
                            >
                                <Mail className="h-6 w-6 text-muted" />
                                <a href="mailto:alphonlabs@gmail.com?subject=Solicitação de Suporte">
                                    E-mail
                                </a>
                            </Button>

                            <span className="text-sm text-gray-500">(Seg-Sex, 8h-18h)(Sáb, 8h-12h)</span>
                        </div>
                    </div>
                </div>

            </PageContent>
        </PageContainer>
    );
}