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
    const pathSegments = pathname.replace(/^\/|\/$/g, "").split("/");

    // Para o layout protegido, sempre começa com o menu principal
    const breadcrumbItems: BreadcrumbItem[] = [
        {
            href: "/dashboard",
            label: "Menu Principal",
        }
    ];

    // Cria o breadcrumb com base nos segmentos de caminho
    let currentPath = "";

    for (let i = 0; i < pathSegments.length; i++) {
        const segment = pathSegments[i];

        // Ignora segmentos vazios e os que não existem no mapa
        if (!segment || !pathMap[segment]) continue;

        currentPath += `/${segment}`;

        breadcrumbItems.push({
            href: currentPath,
            label: pathMap[segment],
            isCurrent: i === pathSegments.length - 1, // O último segmento é o atual
        });
    }

    // Se não tiver nenhum item além do Menu Principal, não mostra o breadcrumb
    if (breadcrumbItems.length <= 1) return null;

    return (
        <div className="py-3 px-6 border-b bg-muted/30">
            <Breadcrumb items={breadcrumbItems} className="text-xs" />
        </div>
    );
} 