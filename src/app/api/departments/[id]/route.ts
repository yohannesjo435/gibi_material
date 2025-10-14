import { getDepartmentById } from "@/lib/actions/departments/getDepartmentById";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const data = await getDepartmentById(id);

  if (!data) {
    return new Response(JSON.stringify({ sucess: false }), { status: 500 });
  }

  return NextResponse.json({ sucess: true, department: data[0] });
}
