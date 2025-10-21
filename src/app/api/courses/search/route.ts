import { searchCourse } from "@/lib/actions/courses/searchCourse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  console.log("hiiii");
  const data = await searchCourse(query);

  return NextResponse.json(
    {
      course: data,
    },
    {
      status: 200,
    }
  );
}
