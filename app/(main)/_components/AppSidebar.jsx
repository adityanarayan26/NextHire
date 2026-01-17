'use client';
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarConstants } from "../../../services/Constants/SidebarConstants"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation";
import { UseUser } from "@/app/Provider";
import { Plus, LogOut } from "lucide-react";
import { supabase } from "@/services/supabase-client";

export function AppSidebar() {
    const path = usePathname()
    const { user } = UseUser()

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    }

    return (
        <Sidebar className="border-r border-[#e2e8f0] bg-white">
            {/* Logo & Brand */}
            <SidebarHeader className="p-6 border-b border-[#e2e8f0]">
                <Link href="/dashboard" className="flex items-center justify-center">
                    <img src="/logo.svg" alt="NextHire" className="h-9" />
                </Link>

                <Link href={'/dashboard/createInterview'} className="block mt-6">
                    <Button className="w-full btn-primary h-11 gap-2 rounded-xl">
                        <Plus className="w-4 h-4" />
                        New Interview
                    </Button>
                </Link>
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent className="p-4">
                <SidebarGroup>
                    <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-3 px-3">
                        Menu
                    </p>
                    <SidebarMenu className="space-y-1">
                        {SidebarConstants.map((options, index) => {
                            const isActive = path === options.path;
                            return (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={options.path}
                                            className={`
                                                flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                                                ${isActive
                                                    ? 'bg-[#4945d1] text-white shadow-md'
                                                    : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#4945d1]'
                                                }
                                            `}
                                        >
                                            <options.icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                                            <span className="capitalize">{options.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* User Profile Footer */}
            <SidebarFooter className="p-4 border-t border-[#e2e8f0]">
                {user && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f8fafc]">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                            {user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#0f172a] truncate">{user?.name || 'User'}</p>
                            <p className="text-xs text-[#64748b] truncate">{user?.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-lg hover:bg-[#fee2e2] text-[#64748b] hover:text-[#dc2626] transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>
    )
}