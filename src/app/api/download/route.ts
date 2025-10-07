// import { supabase } from "@/lib/supabaseClient";

// export async function GET(request: Request) {
//   const { data, error } = await supabase.storage
//     .from("study_materials") // ✅ your bucket name
//     .createSignedUrl(relativePath, 60, { download: true });

//   return Response.redirect(data.signedUrl, 302);
// }
