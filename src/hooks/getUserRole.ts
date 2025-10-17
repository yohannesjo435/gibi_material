import { supabase } from "@/lib/supabaseClient";

export default async function getUserRole() {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData?.session?.user?.id;
  const { data: role } = await supabase
    .from("users")
    .select("role")
    .eq("auth_id", userId)
    .maybeSingle();
  return role;
}
