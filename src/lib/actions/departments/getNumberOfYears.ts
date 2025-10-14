import { supabase } from "@/lib/supabaseClient";

export async function getNumberOfYears(departmentId: string) {
  const { data, error } = await supabase
    .from("departments")
    .select("available_years")
    .eq("id", departmentId);

  if (error) {
    console.error(error);
  }
  return data;
}
