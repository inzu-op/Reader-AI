import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { createClient } from "@/utils/supabase/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(request: Request) {
  try {
    // Get the token from HTTP-only cookies
    const cookieStore =await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      console.log("No token found in cookies");
      return NextResponse.json({ 
        success: false, 
        message: "Not authenticated" 
      }, { status: 401 });
    }
    
    // Verify the token
    const decoded = verify(token, JWT_SECRET) as { id: string; email: string };
    
    // Get user data from Supabase
    const supabase = await createClient();
    const { data: user } = await supabase
      .from("User")
      .select("*")
      .eq("id", decoded.id)
      .single();
    
    if (!user) {
      console.log("User not found in database");
      return NextResponse.json({ 
        success: false, 
        message: "User not found" 
      }, { status: 404 });
    }
    
    // Don't include sensitive information like password
    const { password, ...userWithoutPassword } = user;
    
    console.log("User authenticated successfully:", decoded.email);
    return NextResponse.json({ 
      success: true, 
      user: userWithoutPassword 
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Invalid authentication" 
    }, { status: 401 });
  }
}