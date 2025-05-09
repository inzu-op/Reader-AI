import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const { username, email, password } = await request.json();
  const supabase =await createClient();

  const { data: existingUser } = await supabase
    .from("User")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUser) {
    return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);
  const { data, error } = await supabase
    .from("User")
    .insert([{ username, email, password: hashedPassword }])
    .select();

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, user: data[0] });
}
