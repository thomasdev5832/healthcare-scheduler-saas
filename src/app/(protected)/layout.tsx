import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { AppSidebar } from "./_components/app-sidebar"
import { PageBreadcrumb } from "./_components/page-breadcrumb"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <SidebarTrigger />
                <PageBreadcrumb />
                {children}
            </main>
        </SidebarProvider>
    )
}