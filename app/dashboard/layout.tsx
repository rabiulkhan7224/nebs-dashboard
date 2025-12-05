import { AppSidebar } from "@/components/app-sidebar"
import { NavUser } from "@/components/nav-user";
import { Profile } from "@/components/profile";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
export default function Layout({children}: {children: React.ReactNode}) {
    
  const user= {
    name: "Asif Riaj",
    email: "asif@example.com",
    avatar: "/asif.jpg",
  }
  return (
    <div className="container mx-auto max-w-7xl">
      <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* Top Navbar */}
        <header className="flex  h-16 shrink-0 items-center justify-between border-b bg-background px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-5" />
            <h1 className="text-lg font-semibold hidden md:block">well come </h1>
          </div>

          <Profile user={user}/>
        </header>

        {/* Main Content */}
        <main className="flex  bg-accent">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider></div>
    );
}