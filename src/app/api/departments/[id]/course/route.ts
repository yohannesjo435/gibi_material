import { getByDepartment } from "@/lib/actions/courses/getByDepartment";
import { NextRequest, NextResponse } from "next/server";

//for geting course by deparment
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const courses = await getByDepartment(id);
  return NextResponse.json(courses);
}
