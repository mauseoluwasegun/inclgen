import { httpRouter } from "convex/server";
import { createAuth } from "./authConfig";
import { betterAuthComponent } from "./auth";
import { httpAction } from "./_generated/server";

const http = httpRouter();

betterAuthComponent.registerRoutes(http, createAuth);

http.route({
  path: "/api",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    return new Response(JSON.stringify({ status: "API is running" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

export default http;