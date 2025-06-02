import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieDelete = await cookies(); 
  cookieDelete.delete("session");
  return NextResponse.json({ success: true });
}