"use client"

import { CalendarHeart, Gem, HeartPulse, LayoutDashboard, LogOut, Settings, Stethoscope, UsersRound } from "lucide-react"
//import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Agendamentos",
        url: "/appointments",
        icon: CalendarHeart,
    },
    {
        title: "Médicos",
        url: "/doctors",
        icon: Stethoscope,
    },
    {
        title: "Pacientes",
        url: "/patients",
        icon: UsersRound,
    },
]

export function AppSidebar() {
    const router = useRouter();
    const session = authClient?.useSession();
    const pathname = usePathname();

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
            <SidebarHeader className="p-4 border-b border-b-gray-200 flex items-start justify-center">
                <div className="flex items-center justify-center">
                    <p className="text-2xl font-normal" >
                        Alphon
                        <span className="text-center text-primary font-semibold" >
                            Health
                        </span>
                    </p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col gap-y-2">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url} className={pathname === item.url ? "text-primary font-medium" : ""}>
                                            <item.icon className={pathname === item.url ? "text-primary" : ""} />
                                            <span className={pathname === item.url ? "text-primary" : ""}>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <Separator />
                <SidebarGroup>
                    <SidebarGroupLabel>Outros</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === "/subscriptions-page"}
                                    onClick={() => router.push("/subscriptions-page")}
                                >
                                    <Link href="/subscriptions-page">
                                        <Gem />
                                        <span>Assinatura</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Settings />
                                    Configurações
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t border-t-gray-200">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="cursor-pointer">
                                    <Avatar>
                                        <AvatarFallback>
                                            <HeartPulse className="w-5 h-5" />
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
