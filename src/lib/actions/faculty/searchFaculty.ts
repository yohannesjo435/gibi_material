import { supabase } from "@/lib/supabaseClient";

export async function searchFaculty(query: string) {
  console.log("action query: ", query);
  const { data, error } = await supabase
    .from("faculties")
    .select("id, name")
    .ilike("name", `%${query}%`);

  if (data) {
    console.log("data: ", data[0]);
  }
  if (error) {
    console.log("error while accesing the supabase", error);
    return;
  }

  return data[0];
}
