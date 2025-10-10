import { searchFaculty } from "@/lib/actions/faculty/searchFaculty";

export async function GET(query: string) {
  const searchedFaculty = await searchFaculty(query)


  return searchFaculty
  
}