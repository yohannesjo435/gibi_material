import { getAll } from "@/lib/actions/faculty/getAll";

export async function GET() {
 const allFaculty = await getAll()

 return Response.json({faculties: allFaculty})
}