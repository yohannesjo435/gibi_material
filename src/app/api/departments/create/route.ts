import { Create } from "@/lib/actions/departments/create";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await Create(body);

    return (
      NextResponse.json({ success: true }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("API: ", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
