import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const url = request.nextUrl.clone();
  if (user) {
    if (
      url.pathname === "/signin" ||
      url.pathname === "/signup" ||
      url.pathname === "/"
    ) {
      url.pathname = "/chat";
      return NextResponse.redirect(url);
    }
  } else {
    if (url.pathname === "/chat") {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
