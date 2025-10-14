import { supabase } from "@/lib/supabaseClient";

export async function getByDepartment(department_id: string) {
  const { data, error } = await supabase
    .from("study_material")
    .select(
      "title, short_name, department_id, author, file_size_bytes, file_url, uploaded_at, file_key, original_filename, year, file_type"
    )
    .eq("department_id", department_id);

  if (error) {
    console.log("Error fetching courses: ", error);
  }

  return data;
}
