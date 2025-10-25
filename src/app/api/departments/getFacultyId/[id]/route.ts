import { getFacultyIdbyDepId } from "@/lib/actions/departments/getFacultyId";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const data = await getFacultyIdbyDepId(id);

  if (!data) {
    return NextResponse.json({ sucess: false });
  }

  return NextResponse.json({ sucess: true, facultyId: data });
}
