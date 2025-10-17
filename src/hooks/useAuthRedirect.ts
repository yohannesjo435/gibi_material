import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuthRedirect = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/auth/login");
      } else {
        console.log("I found the session: ", data);
        setLoading(false);
      }
    };
    checkSession();
  }, [router]);

  return { loading };
};
