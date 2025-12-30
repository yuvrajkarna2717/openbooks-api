import express from "express";
import {
  scrapeBookDetailsAndSaveToDB,
  scrapeAllBookDetails,
  scrapeBookDetails,
} from "../controllers/scrapeBookController.js";

const bookController = express.Router();

/**
 * @swagger
 * /api/scrape/save/all-books-details:
 *   post:
 *     summary: Scrape and store all book details
 *     description: Scrapes all book metadata from the demo source and stores it in the database.
 *     responses:
 *       200:
 *         description: Book data scraped and saved successfully
 *       500:
 *         description: Internal server error
 */
bookController.post("/save/all-books-details", scrapeBookDetailsAndSaveToDB);

/**
 * @swagger
 * /api/scrape/all-books-details:
 *   get:
 *     summary: Scrape and return all book details
 *     description: Scrapes and returns all book data without storing it. This operation may take time.
 *     responses:
 *       200:
 *         description: List of all books
 *       500:
 *         description: Internal server error
 */
bookController.get("/all-books-details", scrapeAllBookDetails);

/**
 * @swagger
 * /api/scrape/book-details:
 *   get:
 *     summary: Scrape book details with pagination
 *     description: Scrapes book details for a specific page or page range.
 *     parameters:
 *       - in: query
 *         name: pageX
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Start page number
 *       - in: query
 *         name: pageY
 *         schema:
 *           type: integer
 *           example: 3
 *         description: End page number (optional)
 *     responses:
 *       200:
 *         description: List of books for the given page range
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
bookController.get("/book-details", scrapeBookDetails);

export { bookController };
