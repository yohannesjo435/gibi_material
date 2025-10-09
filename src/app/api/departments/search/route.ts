import { searchDepartment } from "@/lib/actions/departments/searchDepartment";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url)
  const query = searchParams.get("q") ?? ""

  const data = await searchDepartment(query)
  return new Response(JSON.stringify({department: data}), 
  {status: 200, headers: {"Content-Type": "application/json"}})
}