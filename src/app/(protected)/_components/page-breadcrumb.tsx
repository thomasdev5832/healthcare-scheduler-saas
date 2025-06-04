"use client";

import { usePathname } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";

const pathMap: Record<string, string> = {
    dashboard: "Dashboard",
    appointments: "Agendamentos",
    doctors: "Médicos",
    patients: "Pacientes",
    "clinic-form": "Configuração da Clínica",
    new: "Novo",
    edit: "Editar",
    subscription: "Assinatura", // Adicionado para o breadcrumb
};

interface BreadcrumbItem {
    href: string;
    label: string;
    isCurrent?: boolean;
}

export function PageBreadcrumb() {
    const pathname = usePathname();

    // Ignora rotas que não devem ter breadcrumb
    if (pathname === "/") return null;

    // Remove barras iniciais e finais e divide o caminho
    const pathSegments = pathname.replace(/^\/+|\/+$/g, "").split("/");

    // Inicializa a lista de breadcrumbItems
    const breadcrumbItems: BreadcrumbItem[] = [];

    // Caso especial para /dashboard
    if (pathname === "/dashboard") {
        breadcrumbItems.push({
            href: "/dashboard",
            label: "Menu Principal",
            isCurrent: false,
        });
        breadcrumbItems.push({
            href: "/dashboard-breadcrumb-current",
            label: "Dashboard",
            isCurrent: true,
        });
        return (
            <div className="py-3 px-6 border-b bg-muted/30">
                <Breadcrumb items={breadcrumbItems} className="text-xs" />
            </div>
        );
    }

    // Caso especial para /subscription
    if (pathname === "/subscription") {
        breadcrumbItems.push({
            href: "#",
            label: "Outros",
            isCurrent: false,
        });
        breadcrumbItems.push({
            href: "/subscription",
            label: "Assinatura",
            isCurrent: true,
        });
        return (
            <div className="py-3 px-6 border-b bg-muted/30">
                <Breadcrumb items={breadcrumbItems} className="text-xs" />
            </div>
        );
    }

    // Para todas as outras páginas protegidas
    breadcrumbItems.push({
        href: "/dashboard",
        label: "Menu Principal",
        isCurrent: false,
    });

    let currentPath = "";
    let lastIndex = -1;
    for (let i = 0; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        if (!segment || segment === "dashboard" || !pathMap[segment]) continue;
        currentPath += `/${segment}`;
        lastIndex = i;
    }
    // Adiciona os itens do breadcrumb conforme os segmentos
    currentPath = "";
    for (let i = 0; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        if (!segment || segment === "dashboard" || !pathMap[segment]) continue;
        currentPath += `/${segment}`;
        breadcrumbItems.push({
            href: `/dashboard${currentPath}`,
            label: pathMap[segment],
            isCurrent: i === lastIndex,
        });
    }

    if (breadcrumbItems.length <= 1) return null;

    return (
        <div className="py-3 px-6 border-b bg-muted/30">
            <Breadcrumb items={breadcrumbItems} className="text-xs" />
        </div>
    );
}