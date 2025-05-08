import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    const supabase =await createClient();

    const { data: existingUser } = await supabase
      .from("User")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const { data, error } = await supabase
      .from("User")
      .insert([{ username, email, password: hashedPassword }])
      .select() 

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, user: data[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
