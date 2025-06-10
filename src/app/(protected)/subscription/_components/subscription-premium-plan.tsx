"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CheckCircle2, Crown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";

import { createStripeCheckout } from "@/actions/create-stripe-checkout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SubscriptionPremiumPlanProps {
    active?: boolean;
    className?: string;
    userEmail: string;
}

export function SubscriptionPremiumPlan({
    active = false,
    className,
    userEmail,
}: SubscriptionPremiumPlanProps) {
    const router = useRouter();
    const createStripeCheckoutAction = useAction(createStripeCheckout, {
        onSuccess: async ({ data }) => {
            if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
                throw new Error("Stripe publishable key not found");
            }
            const stripe = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
            );
            if (!stripe) {
                throw new Error("Stripe not found");
            }
            if (!data?.sessionId) {
                throw new Error("Session ID not found");
            }
            await stripe.redirectToCheckout({
                sessionId: data.sessionId,
            });
        },
    });

    const handleSubscribeClick = () => {
        createStripeCheckoutAction.execute();
    };

    const handleManagePlanClick = () => {
        router.push(
            `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${userEmail}`,
        );
    };

    const features = [
        "Cadastro de médicos ilimitados",
        "Agendamentos ilimitados",
        "Métricas avançadas",
        "Cadastro de pacientes",
        "Confirmação automática",
        "Suporte prioritário via e-mail e chat",
        "Relatórios personalizados",
        "Integrações avançadas",
    ];

    return (
        <Card className={`flex flex-col ${className}`}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-row gap-2 justify-center items-center">
                        <Crown className="h-6 w-6 text-gray-800" />
                        <h3 className="text-2xl font-bold text-gray-800">Premium</h3>
                    </div>
                    {active && (
                        <Badge className="bg-green-100 text-green-500 hover:bg-green-100">
                            Ativo
                        </Badge>
                    )}
                </div>
                <p className="text-gray-600">
                    Para clínicas e hospitais que buscam o máximo de eficiência
                </p>
                <div className="mt-4 flex gap-4">
                    <div className="border rounded-lg p-3 text-center w-full">
                        <p className="text-sm text-gray-500">Plano anual</p>
                        <p className="text-xl font-bold text-gray-900">R$14.032/ano</p>
                        <p className="text-xs text-green-600 font-medium mt-1">Economize 35%</p>
                    </div>
                    <div className="border rounded-lg p-3 text-center w-full">
                        <p className="text-sm text-gray-500">Plano mensal</p>
                        <p className="text-xl font-bold text-gray-900">R$1.799/mês</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col flex-1">
                <div className="space-y-4 border-t border-gray-200 pt-6 flex-1">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                            <div className="flex-shrink-0">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                            </div>
                            <p className="ml-3 text-gray-600">{feature}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-white">
                    <Button
                        className="w-full"
                        variant={active ? "outline" : "default"}
                        onClick={active ? handleManagePlanClick : handleSubscribeClick}
                        disabled={createStripeCheckoutAction.isExecuting}
                    >
                        {createStripeCheckoutAction.isExecuting ? (
                            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                        ) : active ? (
                            "Gerenciar assinatura"
                        ) : (
                            "Fazer assinatura"
                        )}
                    </Button>
                    <div className="mt-2 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                        <span>Pagamento seguro via</span>
                        <span className="font-medium text-indigo-500">Stripe</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}