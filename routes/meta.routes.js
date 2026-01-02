import express from "express";

const metaController = express.Router();

/**
 * @swagger
 * /api/meta:
 *   get:
 *     tags: [System]
 *     summary: Get API metadata and information
 *     responses:
 *       200:
 *         description: API metadata retrieved successfully
 */
metaController.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "API metadata",
    data: {
      name: "OpenBooks API",
      version: "1.0.0",
      description: "Backend platform for book metadata with clean REST APIs",
      endpoints: {
        books: "/api/fetch/books",
        stats: "/api/fetch/books/stats",
        scraping: "/api/scrape"
      },
      features: [
        "Flexible filtering and search",
        "Pagination and sorting",
        "Statistics and analytics",
        "Rate limiting",
        "Swagger documentation"
      ]
    }
  });
});

export { metaController };