import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function Create(body: object) {
  const { data, error } = await supabaseAdmin
    .from("faculties")
    .insert([body])
    .select();

  if (error) {
    return { sucess: false, error: error };
  }

  return { sucess: true, faculty: data[0] };
}
