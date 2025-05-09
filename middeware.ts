import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect if no token is found
  }

  try {
    verify(token, JWT_SECRET); // Verify the token
    return NextResponse.next(); // Continue the request if the token is valid
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login if token is invalid
  }
}

export const config = {
  matcher: ["/dashboard"], // Protect the dashboard route
};
