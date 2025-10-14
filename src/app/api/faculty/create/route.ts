import { Create } from "@/lib/actions/faculty/create";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
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
