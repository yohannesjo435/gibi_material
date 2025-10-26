import { supabase } from "@/lib/supabaseClient";

export async function getAll() {
  const { data, error } = await supabase
    .from("faculties")
    .select("id, name")
    .limit(5);
  if (error) {
    console.log("Error occures while get data from supabase: ", error);
  }
  return data;
}
