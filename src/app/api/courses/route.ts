import { getAll } from "@/lib/actions/courses/getAll";

export async function GET() {
  const getAllCourses = await getAll()
  return Response.json(getAllCourses)
}
