import { Create } from "@/lib/actions/faculty/create";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await Create(body);
    const facultyId = data.faculty.id;
    return new Response(
      JSON.stringify({ sucess: true, facultyId: facultyId }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("API", error);
    return new Response(
      JSON.stringify({ sucess: false, error: "server Error" }),
      {
        status: 500,
      }
    );
  }
}
