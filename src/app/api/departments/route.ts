import { getAll } from "@/lib/actions/departments/getAll";
import { NextResponse } from "next/server";

export async function GET() {
  const allDepartments = await getAll();
  return NextResponse.json(allDepartments);
}
