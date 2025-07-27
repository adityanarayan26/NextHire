'use client'
 import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './_components/AppSidebar'
import WelcomeComponent from './_components/WelcomeComponent'
import { usePathname } from "next/navigation"
const DashboardProvider = ({ children }) => {
    const path = usePathname()
    return (


        <SidebarProvider>
            <AppSidebar />
            <div className="w-full p-10">
{path !== '/dashboard/createInterview' && <WelcomeComponent/>}
                {/* <SidebarTrigger /> */}
                {children}
            </div>

        </SidebarProvider>

    )
}

export default DashboardProvider
