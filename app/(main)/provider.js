'use client'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from './_components/AppSidebar'

const DashboardProvider = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
                {children}
            </div>
        </SidebarProvider>
    )
}

export default DashboardProvider
