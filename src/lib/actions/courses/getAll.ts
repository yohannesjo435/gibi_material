import { supabase } from "@/lib/supabaseClient";

export async function getAll() {
  const {data, error} = await supabase.from("study_material").select("title, short_name, department_id, author, file_size_bytes, file_url");
  if (error) {
    console.log("Error fetching courses: ", error)
  }

  return data;
}