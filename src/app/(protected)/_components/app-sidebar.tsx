"use client"

import { CalendarHeart, HeartPulse, LayoutDashboard, LogOut, Stethoscope, UsersRound } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
                <Image src={"/logo.svg"} alt="Logo" width={140} height={40} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
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
