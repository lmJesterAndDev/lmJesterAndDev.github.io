import { NextResponse } from "next/server";
import { users } from "@/lib/data";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
  }

  return NextResponse.json({
    username: user.username,
    role: user.role,
  });
}
