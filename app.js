import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

import { rateLimiter } from "./middlewares/rate-limit.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/not-found.middleware.js";

// book controller to scrape book details and save to DB
import { bookController } from "./routes/scrape-book.routes.js";

// fetch book details from DB
import { fetchBookFromDBController } from "./routes/books-from-db.routes.js";

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

// Routes
app.use("/api/scrape", bookController);
app.use("/api/fetch", fetchBookFromDBController);

// Health check
app.get("/health", (_req, res) => {
  res.json({
    status: "success",
    message: "All APIs are working fine.",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/", (_req, res) => {
  res.json({
    message: `OpenBooks API – Public book data service`,
    docs: "/docs",
    health: "/health",
  });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler for unmatched routes
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

export { app };
