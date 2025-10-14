import { getNumberOfYears } from "@/lib/actions/departments/getNumberOfYears";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("departmentID") ?? "";
  const data = await getNumberOfYears(query);

  return NextResponse.json({ sucess: true, data: data });
}
