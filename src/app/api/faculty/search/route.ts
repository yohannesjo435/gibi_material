import { searchFaculty } from "@/lib/actions/faculty/searchFaculty";

export async function GET(query: string) {
  const { searchParams } = new URL(query.url);
  const searchedText = searchParams.get("q");
  console.log("query form api: ", searchedText);
  if (!searchedText) {
    return Response.json({ sucess: false, message: "no searched query" });
  }

  // returned format { id: '04a50290-8541-4eaf-832f-05ab6eaf3e0a', name: 'more facultys' }
  const searchedFaculty = await searchFaculty(searchedText);

  return new Response(JSON.stringify({ faculty: searchedFaculty }), {
    status: 200,
  });
}
