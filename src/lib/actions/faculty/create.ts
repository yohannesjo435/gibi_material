import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function Create(body: object) {
  const { data, error } = await supabaseAdmin
    .from("faculties")
    .insert([body])
    .select();

  if (error) {
    // throw so caller (API route) returns a 500 and logs the error
    throw error;
  }

  return { success: true, faculty: data[0] };
}
