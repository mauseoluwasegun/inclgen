import { httpRouter } from "convex/server";

import { createAuth } from "./authConfig";
import { betterAuthComponent } from "./auth";

const http = httpRouter();

betterAuthComponent.registerRoutes(http, createAuth);

export default http;
