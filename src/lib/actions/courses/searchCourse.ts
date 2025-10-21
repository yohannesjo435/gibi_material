import { supabase } from "@/lib/supabaseClient";

export async function searchCourse(query: string) {
  console.log("query from action: ", query);
  const trimmed = query.trim();
  if (!trimmed) return [];

  const { data, error } = await supabase
    .from("study_material")
    .select("id, title, short_name, file_size_bytes, file_url, uploaded_at")
    .or(`title.ilike.%${trimmed}%,short_name.ilike.%${trimmed}%`);

  if (error) {
    console.error("Failed to get data from supabase: ", error);
    return [];
  }

  return data ?? [];
}
