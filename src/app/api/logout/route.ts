import { createClient } from "@/lib/supabase/server/client";
import { redirect } from "next/navigation";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/signin");
  }
  await supabase.auth.signOut();
  return redirect("/signin");
}
