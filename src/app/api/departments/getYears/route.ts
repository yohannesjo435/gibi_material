import { getNumberOfYears } from "@/lib/actions/departments/getNumberOfYears";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("departmentID") ?? "";
  const data = await getNumberOfYears(query);

  return new Response(JSON.stringify({ sucess: true, data: data }));
}
