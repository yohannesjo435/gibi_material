import { getAll } from "@/lib/actions/faculty/getAll";
import { NextResponse } from "next/server";

export async function GET() {
  const allFaculty = await getAll();

  return NextResponse.json({ faculties: allFaculty });
}
