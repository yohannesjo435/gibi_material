import { supabase } from "@/lib/supabaseClient";

export async function getAll() {
  const {data, error} = await supabase.from("departments").select("name, short_name, available_files, icon_url");

  if (error) {
    console.error("Error in getting departments: ", error)
  }

  return data;
}