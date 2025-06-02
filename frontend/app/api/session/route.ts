import { NextResponse } from 'next/server';
import { adminAuth } from '@/app/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { idToken } = await req.json();

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 1000, 
    });

    const cookieStore = await cookies(); 

    cookieStore.set('session', sessionCookie, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24, 
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
