import { supabase } from "@/lib/supabaseClient";

export async function Create(body: object) {
  const { data, error } = await supabase
    .from("faculties")
    .insert([body])
    .select();

  if (error) {
    return { sucess: false, error: error };
  }

  return { sucess: true, faculty: data[0] };
}
