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
          <Link
            className="border-1 bg-[#e1e8f0] py-2 text-black rounded-[7px] text-[13px] font-[600] text-center"
            href={"/auth/login"}
          >
            Login
          </Link>
          <Link
            className="border-1 bg-[#e1e8f0] py-2 text-black rounded-[7px] text-[13px] font-[600] text-center"
            href={"/auth/signup"}
          >
            Sign Up
          </Link>
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
