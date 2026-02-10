import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const ADMIN_USER = "admin";
    const ADMIN_PASS = "123";

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const response = NextResponse.json({ 
        success: true, 
        message: "Login Berhasil!" 
      });

      response.cookies.set('admin_session', 'authenticated_token_123', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400,
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: "Username atau Password Salah" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}