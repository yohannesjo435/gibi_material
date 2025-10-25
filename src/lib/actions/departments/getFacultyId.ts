import { supabase } from "@/lib/supabaseClient";

export async function getFacultyIdbyDepId(departmentId: string) {
  const { data: departmentRow, error } = await supabase
    .from("departments")
    .select("faculty_id")
    .eq("id", departmentId)
    .maybeSingle();

  if (error || !departmentRow?.faculty_id) {
    console.log(error);
    return;
  }

  const facultyId = departmentRow.faculty_id;

  return facultyId;
}
