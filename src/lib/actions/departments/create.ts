import { supabaseAdmin } from "@/lib/supabaseAdmin";
interface FormData {
  name: string;
  short_name: string;
  facultyId: string;
  available_years: string[];
}

export async function Create(formData: FormData) {
  const { error } = await supabaseAdmin.from("departments").insert([formData]);

  if (error) {
    console.error("Error while inserting data: ", error);
    return;
  }
}
