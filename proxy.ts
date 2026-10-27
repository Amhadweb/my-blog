import { NextResponse } from "next/server";
import { auth } from "./auth";

// В Next.js 16 функция должна называться proxy
export async function proxy(request: Request) {
  // Получаем сессию вручную (так как мы больше не используем обертку auth для middleware)
  const session = await auth();
  const isLoggedIn = !!session;
  const isLoginPage = new URL(request.url).pathname === "/login";

  // Если пользователь не авторизован и пытается зайти НЕ на страницу логина
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Если пользователь УЖЕ авторизован, но пытается зайти на /login
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// Матчер остается таким же
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};