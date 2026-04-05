// import { httpRouter } from "convex/server";

// import { createAuth } from "./authConfig";
// import { betterAuthComponent } from "./auth";

// const http = httpRouter();

// betterAuthComponent.registerRoutes(http, createAuth);

// export default http;


import { httpRouter } from "convex/server";
import { createAuth } from "./authConfig";
import { betterAuthComponent } from "./auth";
import { httpAction } from "./_generated/server"; // Import this

const http = httpRouter();

// 1. Keep your auth routes
betterAuthComponent.registerRoutes(http, createAuth);

// 2. Add a manual route for "/api"
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