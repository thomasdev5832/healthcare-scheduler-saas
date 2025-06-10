"use client"

import { CalendarHeart, Gem, HandCoins, Headset, HeartPulse, LayoutDashboard, LogOut, Mail, Settings, Stethoscope, Syringe, User, UsersRound, Video } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import LogoAlphon from "@/components/logo-alphon"
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
    {
        title: "Telemedicina",
        url: "/",
        icon: Video,
    },
    {
        title: "Financeiro",
        url: "/",
        icon: HandCoins,
    },
    {
        title: "Marketing",
        url: "/",
        icon: Mail,
    },
    {
        title: "Estoque",
        url: "/",
        icon: Syringe,
    },
]

// Define other menu items for the "Outros" section.
const otherItems = [
    {
        title: "Relatórios",
        url: "/",
        icon: HeartPulse,
    },
    {
        title: "Suporte",
        url: "/support",
        icon: Headset,
    },
    {
        title: "Plano",
        url: "/subscription",
        icon: Gem,
    },
    {
        title: "Configurações",
        url: "/",
        icon: Settings,
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
                <LogoAlphon />
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
                        <SidebarMenu className="flex flex-col gap-y-2">
                            {otherItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild={!!item.url}
                                        isActive={item.url ? pathname === item.url : false}
                                    >
                                        {item.url ? (
                                            <Link href={item.url} className={pathname === item.url ? "text-primary font-medium" : ""}>
                                                <item.icon className={pathname === item.url ? "text-primary" : ""} />
                                                <span className={pathname === item.url ? "text-primary" : ""}>{item.title}</span>
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
