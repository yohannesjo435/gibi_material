import { supabase } from "@/lib/supabaseClient";

export async function searchFaculty(query: string) {
  const { data, error } = await supabase
    .from("faculties")
    .select("id, name")
    .ilike("name", `%${query}%`);

  if (error) {
    console.log("error while accesing the supabase", error);
    return;
  }

  return data[0];
}
