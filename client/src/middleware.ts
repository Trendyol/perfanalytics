import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const loginRequiredPagesRegexes = [/^\/$/, /^\/dashboard/];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const isLoggedIn = request.cookies.has("auth-cookie");
  const isLoginRequiredPages = loginRequiredPagesRegexes.some((reg) => reg.test(url.pathname));

  if (isLoginRequiredPages && !isLoggedIn) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
