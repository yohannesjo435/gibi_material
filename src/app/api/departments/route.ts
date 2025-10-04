import { getAll } from "@/lib/actions/departments/getAll";

export async function GET() {
  const allDepartments = await getAll()
  return Response.json(allDepartments)
}