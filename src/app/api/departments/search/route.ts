import { searchDepartment } from "@/lib/actions/departments/searchDepartment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  console.log("searched query: ", searchParams);
  const query = searchParams.get("q") ?? "";

  const data = await searchDepartment(query);
  return NextResponse.json(
    { departments: data },
    {
      status: 200,
    }
  );
}
