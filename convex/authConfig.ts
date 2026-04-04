import type { GenericMutationCtx } from "convex/server";         // ✅ correct package
import type { GenericDataModel } from "convex/server";
import { convex } from "@convex-dev/better-auth/plugins";
import { convexAdapter } from "@convex-dev/better-auth";
import { betterAuthComponent } from "./auth";
import { anonymous } from "better-auth/plugins";
import { betterAuth } from "better-auth";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://inclgen.vercel.app";

type GenericCtx = any;

const createOptions = (ctx: GenericCtx) => ({
  baseURL,
  database: convexAdapter(ctx, betterAuthComponent),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      allowDifferentEmails: true,
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  trustedOrigins: [
    "https://inclgen.vercel.app",
  ],
  plugins: [
    anonymous({
      onLinkAccount: async () => {
        console.log("Linking anonymous account to new user");
      },
    }),
  ],
});

export const createAuth = (ctx: GenericCtx) => {
  const options = createOptions(ctx);
  return betterAuth({
    ...options,
    plugins: [...options.plugins, convex({ options })],
  });
};