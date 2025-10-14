import { supabase } from "@/lib/supabaseClient";

export async function getDepartmentById(departmentId: string) {
  const { data, error } = await supabase
    .from("departments")
    .select("name, short_name, available_years, icon_url, faculty_id")
    .eq("id", departmentId);

  if (error) {
    console.log(error);
  }

  return data;
}
