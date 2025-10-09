import { supabase } from "@/lib/supabaseClient";

export async function searchDepartment(query: string ) {
  const {data, error} = await supabase
    .from("departments")
    .select("id, name, short_name, available_years, icon_url").or(`name.ilike.%${query}%, short_name.ilike.%${query}%`)

  if(error) {
    console.error("Failed to get data from supabase: ", error)
  }

  return data
}