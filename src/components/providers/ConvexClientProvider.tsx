"use client";

import type { ReactNode } from "react";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!authClient) {
    // Server-side: authClient is null (no window)
    return <ConvexProvider client={convex}>{children}</ConvexProvider>;
  }

  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClient}>
      {children}
    </ConvexBetterAuthProvider>
  );
}
