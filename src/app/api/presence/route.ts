// app/api/presence/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, status } = await req.json();

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // Pastikan ada di .env
    );

    await supabaseAdmin
      .from("profiles")
      .update({
        is_online: status === "online",
        last_seen: new Date().toISOString(),
      })
      .eq("id", userId);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
