import { searchFaculty } from "@/lib/actions/faculty/searchFaculty";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const searchedText = searchParams.get("q");
  console.log("query form api: ", searchedText);
  if (!searchedText) {
    return NextResponse.json(
      { sucess: false, message: "no searched query" },
      { status: 400 }
    );
  }

  // returned format { id: '04a50290-8541-4eaf-832f-05ab6eaf3e0a', name: 'more facultys' }
  const searchedFaculty = await searchFaculty(searchedText);

  return NextResponse.json({ faculty: searchedFaculty });
}
