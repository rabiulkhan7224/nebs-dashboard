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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
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
        {
          title: "Employee Database",
          url: "#",
        },
        {
          title: "Add New Employee",
          url: "#",
        },
        {
          title: "Performance Report",
          url: "#",
        },
        {
          title: "Performance History",
          url: "#",
        },
      ],
    },
    {
      title: "Payroll",
      url: "#",
      icon: PieChart,
    },
    {
      title: "Pay Slip",
      url: "#",
      icon: FileText,
    },
    {
      title: "Attendance",
      url: "#",
      icon: Users,
    },
    {
      title: "Request Center",
      url: "#",
      icon: MessageSquare,
    },
    {
      title: "Career Database",
      url: "#",
      icon: Briefcase,
      items: [],
    },
    {
      title: "Document Manager",
      url: "#",
      icon: FileText,
    },
    {
      title: "Notice Board",
      url: "#",
      icon: FileText,
    },
    {
      title: "Activity Log",
      url: "#",
      icon: History,
    },
    {
      title: "Exit Interview",
      url: "#",
      icon: LogOut,
    },
    {
      title: "Profile",
      url: "#",
      icon: User,
    },
  ],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
