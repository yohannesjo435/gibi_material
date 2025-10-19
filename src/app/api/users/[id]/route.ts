import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

  if (authError) {
    throw console.error("Failed to delete auth user: " + authError.message);
  }

  return NextResponse.json({ sucess: true }, { status: 200 });
}
