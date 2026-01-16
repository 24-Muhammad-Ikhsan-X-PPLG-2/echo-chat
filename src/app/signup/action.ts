"use server";

import { createClient } from "@/lib/supabase/server/client";

export async function SignUpServerAction(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!fullName || !email || !password) {
    return { error: "All fields are required" };
  }
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: fullName,
          email,
          avatar_url: null,
          is_online: false,
          last_seen: null,
        },
      },
    });
    if (error) {
      console.error(error);
      return { error: error.message };
    }
    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }
}
