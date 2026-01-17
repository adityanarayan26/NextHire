import { LayoutDashboard, ListVideo, MessageSquare } from 'lucide-react';

export const SidebarConstants = [
    {
        id: 1,
        name: "Dashboard",
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        id: 2,
        name: "All Interviews",
        icon: ListVideo,
        path: '/all-interviews'
    },
    {
        id: 3,
        name: "Feedback",
        icon: MessageSquare,
        path: '/feedback'
    }
]