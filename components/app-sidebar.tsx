"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Briefcase,
  Command,
  FileText,
  Frame,
  GalleryVerticalEnd,
  History,
  LogOut,
  Map,
  MessageSquare,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

// This is sample data.
const data = {
  user: {
    name: "Asif Riaj",
    email: "asif@example.com",
    avatar: "/asif.jpg",
  },
  teams: [
    {
      name: "Nebs-IT",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Frame,
      isActive: true,
    },
    {
      title: "Employee",
      url: "#",
      icon: Bot,
      items: [
        { title: "Employee Database", url: "/dashboard/employees" },
        { title: "Add New Employee", url: "/dashboard/employees/new" },
        { title: "Performance Report", url: "/dashboard/performance" },
        { title: "Performance History", url: "/dashboard/performance/history" },
      ],
    },
    { title: "Payroll", url: "/dashboard/payroll", icon: PieChart },
    { title: "Pay Slip", url: "/dashboard/payslip", icon: FileText },
    { title: "Attendance", url: "/dashboard/attendance", icon: Users },
    { title: "Request Center", url: "/dashboard/requests", icon: MessageSquare },
    { title: "Career Database", url: "/dashboard/career", icon: Briefcase },
    { title: "Document Manager", url: "/dashboard/documents", icon: FileText },
    { title: "Notice Board", url: "/dashboard/notice", icon: FileText },
    { title: "Activity Log", url: "/dashboard/activity", icon: History },
    { title: "Exit Interview", url: "/dashboard/exit-interview", icon: LogOut },
    { title: "Profile", url: "/dashboard/profile", icon: User },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
   <SidebarHeader className="h-16 border-b">
        <div className="flex h-full items-center justify-center px-4">
          <Image
            src="/logo.png"
            alt="Nebs-IT"
            width={140}
            height={140}
            className="h-25 w-30 object-contain transition-all duration-200 
                       group-data-[collapsible=icon]:h-16 group-data-[collapsible=icon]:w-9"
            priority
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}