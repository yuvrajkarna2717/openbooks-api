import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/api-docs.config.js";

import { rateLimiter } from "./middlewares/rate-limit.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/not-found.middleware.js";

// fetch book details from DB
import { fetchBookFromDBController } from "./routes/books.routes.js";

// meta information
import { metaController } from "./routes/meta.routes.js";
import { healthCheck, rootroute } from "./controllers/health.controller.js";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_DB_URL",
];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

const app = express();

app.use(cors());
app.use(rateLimiter);

// Middleware
app.use(express.json());

// Root endpoint
app.get("/", rootroute);

// Health check
app.get("/health", healthCheck);

// Routes
app.use("/api/fetch", fetchBookFromDBController);
app.use("/api/meta", metaController);

// Swagger API documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler for unmatched routes
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

export { app };
