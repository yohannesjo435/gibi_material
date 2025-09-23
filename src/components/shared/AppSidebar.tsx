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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const AppSidebar = () => {
  return (
    <div>
      <Sidebar>
        <SidebarHeader className="flex items-end">
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map(({ title, href }, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton>
                    <Link href={href}>{title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
          <Button variant="outline">Login</Button>
          <Button variant="outline">Sign Up</Button>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default AppSidebar;

const menu = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Course",
    href: "/course",
  },
  {
    title: "Blog",
    href: "/",
  },
  {
    title: "Faculity Dashboard",
    href: "/dashboard/faculty",
  },
  {
    title: "Dashboard",
    href: "/dashboard/manager",
  },
];
