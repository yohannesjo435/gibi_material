import { getDepartmentById } from "@/lib/actions/departments/getDepartmentById";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await getDepartmentById(id);

  if (!data) {
    return new Response(JSON.stringify({ sucess: false }), { status: 500 });
  }

  return Response.json({ sucess: true, department: data[0] });
}
