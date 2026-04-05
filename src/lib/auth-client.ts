import { createAuthClient } from "better-auth/react";
import { anonymousClient } from "better-auth/client/plugins";
import { convexClient } from "@convex-dev/better-auth/client/plugins";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://inclgen.vercel.app";

export const authClient =
  typeof window !== "undefined"
    ? createAuthClient({
        baseURL,
        plugins: [anonymousClient(), convexClient()],
      })
    : null;
