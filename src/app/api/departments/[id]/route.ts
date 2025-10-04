import { getByDepartment } from "@/lib/actions/courses/getByDepartment"

export async function GET(request: Request, {params}: {params: {id: string}}  ) {
  const courses = await getByDepartment(params.id)
  return Response.json(courses)
}