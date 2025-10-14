import { getByDepartment } from "@/lib/actions/courses/getByDepartment";

//for geting course by deparment
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const courses = await getByDepartment(id);
  return Response.json(courses);
}
