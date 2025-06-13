"use client"

import { BookMarked, CalendarHeart, ChartNoAxesCombined, ChevronDown, ChevronUp, Gem, Headset, Landmark, LayoutDashboard, LogOut, Mail, Settings, Stethoscope, Syringe, User, UsersRound, Video } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

import LogoAlphon from "@/components/logo-alphon"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"

// Menu items
const items = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Agendamentos", url: "/appointments", icon: CalendarHeart },
    { title: "Médicos", url: "/doctors", icon: Stethoscope },
    { title: "Pacientes", url: "/patients", icon: UsersRound },
    { title: "Telemedicina", url: "/", icon: Video },
]

const otherItems = [
    { title: "Relatórios", url: "/", icon: ChartNoAxesCombined },
    { title: "Financeiro", url: "/", icon: Landmark },
    { title: "Marketing", url: "/", icon: Mail },
    { title: "Estoque", url: "/", icon: Syringe },
]

const generalItems = [
    { title: "Plano", url: "/subscription", icon: Gem },
    { title: "Guia de Uso", url: "/tutorials", icon: BookMarked },
    { title: "Suporte", url: "/support", icon: Headset },
    { title: "Configurações", url: "/", icon: Settings },
]

export function AppSidebar() {
    const router = useRouter();
    const session = authClient?.useSession();
    const pathname = usePathname();

    const [isMainOpen, setIsMainOpen] = useState(true)
    const [isOtherOpen, setIsOtherOpen] = useState(true)

    const handleSignOut = async () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/authentication");
                },
            },
        });
    };

    return (
        <Sidebar>
            <SidebarHeader className="p-4 flex items-start justify-center">
                <LogoAlphon />
            </SidebarHeader>
            <SidebarContent className="flex flex-col h-full">
                {/* Menu Principal */}
                <SidebarGroup>
                    <button
                        onClick={() => setIsMainOpen(!isMainOpen)}
                        className="flex items-center justify-between w-full px-2 text-left font-semibold text-xs text-muted-foreground"
                    >
                        <span>Menu Principal</span>
                        {isMainOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {isMainOpen && (
                        <SidebarGroupContent>
                            <SidebarMenu className="flex flex-col gap-y-2 pl-4 pt-2">
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title} className={pathname === item.url ? "border border-gray-100 rounded-xl shadow-sm" : ""}>
                                        <SidebarMenuButton asChild isActive={pathname === item.url}>
                                            <Link href={item.url} className={pathname === item.url ? "" : ""}>
                                                <item.icon className={pathname === item.url ? "text-primary" : ""} />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    )}
                </SidebarGroup>



                {/* Outros */}
                <SidebarGroup>
                    <button
                        onClick={() => setIsOtherOpen(!isOtherOpen)}
                        className="flex items-center justify-between w-full px-2 text-left font-semibold text-xs text-muted-foreground"
                    >
                        <span>Outros</span>
                        {isOtherOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {isOtherOpen && (
                        <SidebarGroupContent>
                            <SidebarMenu className="flex flex-col gap-y-2 pl-4 pt-2">
                                {otherItems.map((item) => (
                                    <SidebarMenuItem key={item.title} className={pathname === item.url ? "border border-gray-100 rounded-xl shadow-sm" : ""}>
                                        <SidebarMenuButton
                                            asChild={!!item.url}
                                            isActive={item.url ? pathname === item.url : false}
                                        >
                                            {item.url ? (
                                                <Link href={item.url} className={pathname === item.url ? "text-primary font-medium" : ""}>
                                                    <item.icon className={pathname === item.url ? "text-primary" : ""} />
                                                    <span>{item.title}</span>
                                                </Link>
                                            ) : (
                                                <>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </>
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    )}

                </SidebarGroup>

                {/* Geral (fixo no final) */}
                <SidebarGroup className="mt-auto">

                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col gap-y-2 pt-2">
                            {generalItems.map((item) => (
                                <SidebarMenuItem key={item.title} className={pathname === item.url ? "border border-gray-100 rounded-xl shadow-sm" : ""}>
                                    <SidebarMenuButton
                                        asChild={!!item.url}
                                        isActive={item.url ? pathname === item.url : false}
                                    >
                                        {item.url ? (
                                            <Link href={item.url} className={pathname === item.url ? "text-primary font-medium" : ""}>
                                                <item.icon className={pathname === item.url ? "text-primary" : ""} />
                                                <span>{item.title}</span>
                                            </Link>
                                        ) : (
                                            <>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer com dropdown */}
            <SidebarFooter className="p-4 border-t border-t-gray-200">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="cursor-pointer">
                                    <Avatar>
                                        <AvatarFallback>
                                            <User className="w-5 h-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm">{session.data?.user.name}</p>
                                        <p className="text-xs text-muted-foreground">{session.data?.user.email}</p>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                                    <LogOut className="mr-2" />
                                    Sair
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
