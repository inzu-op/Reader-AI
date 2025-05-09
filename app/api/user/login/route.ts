import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Input validation
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password are required"
      }, { status: 400 });
    }
    
    // Get user from Supabase
    const supabase = await createClient();
    const { data: user } = await supabase
      .from("User")
      .select("*")
      .eq("email", email.toLowerCase())
      .single();
    
    if (!user) {
      console.log(`Login failed: User with email ${email} not found`);
      return NextResponse.json({
        success: false,
        message: "Invalid email or password"
      }, { status: 401 });
    }
    
    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      console.log(`Login failed: Invalid password for ${email}`);
      return NextResponse.json({
        success: false,
        message: "Invalid email or password"
      }, { status: 401 });
    }
    
    // Generate JWT token
    const token = sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Set the token in an HTTP-only cookie
    const cookieStore =await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });
    
    console.log(`User ${email} logged in successfully`);
    
    // Return token in response as well for client-side code
    return NextResponse.json({
      success: true,
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred during login"
    }, { status: 500 });
  }
}