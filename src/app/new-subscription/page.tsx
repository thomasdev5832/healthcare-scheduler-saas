import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "../(protected)/subscription/_components/subscription-plan";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        redirect("/login");
    }
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 pt-20">
            <div className="w-full max-w-3xl text-center flex flex-col items-center justify-center">
                {/* Branding */}
                <p className="mb-12 text-5xl font-light tracking-tight text-gray-800">
                    Alphon<span className="text-primary font-semibold">Health</span>
                </p>

                {/* Headline inspiradora */}
                <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900">
                    Simples. Poderoso. Eficiente.
                </h1>

                {/* Subheadline descritivo */}
                <p className="mb-10 text-xl text-gray-600 leading-relaxed">
                    Transforme a gestão do seu consultório com uma plataforma que economiza seu tempo e melhora sua produtividade.
                </p>

                {/* Destaque com benefício-chave */}
                <div className="mb-12 rounded-2xl border border-primary/50 bg-blue-50 px-3 py-3 shadow-md">
                    <p className="text-xs font-semibold text-primary leading-relaxed">
                        🚀 Profissionais que usam o Alphon Health economizam em média{" "}
                        <span className="font-bold">15 horas por semana</span> em tarefas administrativas.
                    </p>
                </div>

                {/* Componente de planos */}
                <div className="mb-12 w-full max-w-lg">
                    <SubscriptionPlan userEmail={session.user.email} />
                </div>

                {/* Prova social e garantia */}
                <div className="flex flex-col items-center gap-2">

                    <p className="text-sm text-gray-500">
                        <span className="text-primary font-semibold">30 dias de garantia</span> ou seu dinheiro de volta.
                    </p>
                    <p className="text-xs text-gray-500">
                        Experimente sem riscos. Se não estiver satisfeito, devolvemos 100% do valor.
                    </p>
                </div>
            </div>
            <div className="bottom-0 left-0 w-full flex flex-col items-center bg-white py-4 mt-20">
                <p className="text-sm font-light tracking-tight text-gray-800">
                    Alphon<span className="text-primary font-semibold">Health</span>
                </p>
                <p className="text-center text-gray-500 text-xs">
                    © {new Date().getFullYear()} Alphon Technology. Todos os direitos reservados.
                </p>
            </div>
        </div>


    );
}