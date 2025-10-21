import { Create } from "@/lib/actions/faculty/create";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await Create(body);
    const facultyId = data.faculty.id;
    return NextResponse.json(
      { success: true, facultyId: facultyId },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("API", error);
    // Return detailed error in development to help debugging, but avoid leaking details in production
    const isProd = process.env.NODE_ENV === "production";
    const errorMessage = isProd
      ? "server error"
      : (error as any)?.message ?? "unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      {
        status: 500,
      }
    );
  }
}
