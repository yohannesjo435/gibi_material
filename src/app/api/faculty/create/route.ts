import { Create } from "@/lib/actions/faculty/create";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await Create(body);
    const facultyId = await data.faculty.id;
    return NextResponse.json(
      { sucess: true, facultyId: facultyId },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("API", error);
    return NextResponse.json(
      { sucess: false, error: "server Error" },
      {
        status: 500,
      }
    );
  }
}
