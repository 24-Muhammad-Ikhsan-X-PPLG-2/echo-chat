import { createClient } from "@/lib/supabase/server/client";
import Chat from "./client";
import { redirect } from "next/navigation";

const Page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/signin");
  }

  return <Chat user={user} />;
};

export default Page;
