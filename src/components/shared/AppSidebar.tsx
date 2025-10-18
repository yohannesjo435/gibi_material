"use client";
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
import getUserRole from "@/hooks/getUserRole";
import useAuthSession from "@/hooks/useAuthSession";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const AppSidebar = () => {
  const { user } = useAuthSession();
  const [role, setRole] = useState<string | null>("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      const data = await getUserRole();
      setRole(data?.role || null);
      setLoading(false);
    }
    if (user) fetchRole();
  }, [user]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Error signing out: ", error.message);
    } else {
      toast.success("Signed out.");
    }

    router.push("/");
  }
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
                  <SidebarMenuButton asChild>
                    <Link href={href}>{title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {role === "faculty" && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={"/dashboard"}>faculty Dashboard</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              {role === "manager" && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={"/dashboard"}>Manager Dashboard</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
          {!user ? (
            <>
              <Link href={"/auth/login"}>
                <Button
                  variant="outline"
                  className="w-full border-1 rounded-[7px] text-[13px] font-[600] text-center"
                >
                  Login
                </Button>
              </Link>
              <Link
                className="border-1 bg-[#e1e8f0] py-2 text-black rounded-[7px] text-[13px] font-[600] text-center"
                href={"/auth/signup"}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div>
              <Link href={"/auth/login"}>
                <Button
                  variant="destructive"
                  disabled={loading}
                  onClick={signOut}
                  className="w-full"
                >
                  Log out
                </Button>
              </Link>
            </div>
          )}
          {user && (
            <div className="flex gap-2 items-center justify-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Admin</AvatarFallback>
              </Avatar>
              <p className="mt-1">{user?.user_metadata.fullName}</p>
            </div>
          )}
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
];
