
import DashboardProvider from './provider'
import { Toaster } from "@/components/ui/sonner"

const DashboardLayout = ({ children }) => {
    return (
        <div className='bg-secondary'>

            <DashboardProvider>
                <div className=''>
        <Toaster />

                    {children}
                </div>
            </DashboardProvider>
        </div>
    )
}

export default DashboardLayout
