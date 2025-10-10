import { Create } from "@/lib/actions/departments/create";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await Create(body);

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
    });
  } catch (error) {
    console.log("API: ", error);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500 }
    );
  }
}
