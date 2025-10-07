// import { supabase } from "@/lib/supabaseClient";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const fullUrl = searchParams.get("file");

//   if (!fullUrl) {
//     return new Response("Missing file parameter", { status: 400 });
//   }

//   // Extract the path after "/public/materials/"
//   const match = fullUrl.match(/\/public\/study_materials\/(.+)$/);
//   const relativePath = match?.[1]; // e.g. "year4/CS101.pdf"
//   console.log("relative path: ", relativePath)

//   if (!relativePath) {
//     return new Response("Invalid file path", { status: 400 });
//   }

//   const { data, error } = await supabase.storage
//     .from("study_materials") // ✅ your bucket name
//     .createSignedUrl(relativePath, 60, { download: true });

//   if (error || !data?.signedUrl) {
//     return new Response("Failed to generate download URL", { status: 500 });
//   }

//   return Response.redirect(data.signedUrl, 302);
// }
