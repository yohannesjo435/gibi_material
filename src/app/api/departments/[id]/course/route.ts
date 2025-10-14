import { getByDepartment } from "@/lib/actions/courses/getByDepartment";
import { NextRequest, NextResponse } from "next/server";

//for geting course by deparment
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const courses = await getByDepartment(id);
  return NextResponse.json(courses);
}
