import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

import { rateLimiter } from "./middlewares/rate-limit.middleware.js";

// book controller to scrape book details and save to DB
import { bookController } from "./routes/scrape-book.routes.js";

// fetch book details from DB
import { fetchBookFromDBController } from "./routes/books-from-db.routes.js";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_DB_URL'];
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
app.get("/healthz", (req, res) => {
  res.json({
    status: "success",
    message: "All APIs are working fine.",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: `Welcome to OpenBooks API - Scraping ${process.env.WEBSITE_URL}`,
    docs: "/docs",
    health: "/healthz"
  });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };
