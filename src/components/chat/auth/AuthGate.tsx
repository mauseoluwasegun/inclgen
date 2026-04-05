"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (!authClient) {
        console.error("Auth client not available");
        if (!cancelled) setReady(true);
        return;
      }

      try {
        const session = await authClient.getSession();
        console.log("Session", session);

        if (!cancelled) {
          if (!session.data?.user) {
            console.log("No session - redirecting to auth");
            router.push("/auth");
            return;
          }
          setReady(true);
        }
      } catch (error: any) {
        console.error("Auth initialization error:", error);
        if (!cancelled) {
          router.push("/auth");
        }
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="fixed inset-0 overflow-hidden flex items-center justify-center">
        Redirecting to chat
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGate;
