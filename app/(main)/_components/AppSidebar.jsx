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
import { usePathname } from "next/navigation";

export function AppSidebar() {
    const path = usePathname()


    return (
        <Sidebar >
            <SidebarHeader className="m-5 " >
                <h1 className="text-lg font-semibold">NextHire</h1>
                <p className="text-sm text-muted-foreground">Your AI-powered assistant</p>
               <Link href={'/dashboard/createInterview'}> <Button className="mt-4 capitalize" >create new interview + </Button></Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup >
                    <SidebarContent>
                        <SidebarMenu>
                            {SidebarConstants.map((options, index) => (
                                <SidebarMenuItem key={index} className="p-1">
                                    <SidebarMenuButton asChild className={`p-1 ${path === options.path && 'bg-primary/10' } hover:bg-primary/5`}>
                                        <Link href={options.path} >
                                            <options.icon />
                                            <span className={`capitalize font-medium  ${path === options.path && 'text-primary'}`}>
                                                {options.name}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}