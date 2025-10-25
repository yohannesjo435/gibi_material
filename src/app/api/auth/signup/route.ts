import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { fullName, phone, email, password, departmentId, facultyId } =
      await req.json();
    console.log(`   
      from api      
        full_name: ${fullName},
        phone_number: ${phone},
        department_id: ${departmentId}`);

    const { data: userData, error: signUpError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        phone,
        password,
        email_confirm: true,
        phone_confirm: true,
        user_metadata: { fullName },
      });

    if (signUpError || !userData.user) {
      return NextResponse.json(
        {
          error: signUpError?.message || "Auth creation Failed",
        },
        { status: 400 }
      );
    }

    const authId = userData.user.id;

    //user table
    const { error: profileError } = await supabaseAdmin.from("users").insert([
      {
        auth_id: authId,
        full_name: fullName,
        phone_number: phone,
        department_id: departmentId,
        faculty_id: facultyId,
        role: "pending",
        status: "pending",
      },
    ]);

    if (profileError) {
      return NextResponse.json(
        {
          error: profileError.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({ message: "Signup sucessfull" });
  } catch (err) {
    console.log("Signup API error: ", err);
    return NextResponse.json(
      {
        error: err || "Internal server error",
      },
      { status: 500 }
    );
  }
}
