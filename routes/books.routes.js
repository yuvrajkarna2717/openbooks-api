import express from "express";
import {
  getBooks,
  getBookById,
  getBookStats,
  getRatingStats,
  getRandomBook
} from "../controllers/books.controller.js";

const fetchBookFromDBController = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: Book data access and analytics
 */

/**
 * @swagger
 * /api/fetch/books:
 *   get:
 *     tags: [Books]
 *     summary: Get books with flexible filtering and pagination
 *     description: Primary endpoint supporting search, filtering, sorting, and pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search books by title
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: rating
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, title, price, rating]
 *           default: id
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *     responses:
 *       200:
 *         description: Books retrieved successfully
 */
fetchBookFromDBController.get("/books", getBooks);

/**
 * @swagger
 * /api/fetch/books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Get single book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */
fetchBookFromDBController.get("/books/:id", getBookById);

/**
 * @swagger
 * /api/fetch/books/stats:
 *   get:
 *     tags: [Books]
 *     summary: Get book collection statistics
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 */
fetchBookFromDBController.get("/books/stats", getBookStats);

/**
 * @swagger
 * /api/fetch/books/stats/ratings:
 *   get:
 *     tags: [Books]
 *     summary: Get rating distribution
 *     responses:
 *       200:
 *         description: Rating statistics retrieved successfully
 */
fetchBookFromDBController.get("/books/stats/ratings", getRatingStats);

/**
 * @swagger
 * /api/fetch/books/random:
 *   get:
 *     tags: [Books]
 *     summary: Get a random book
 *     responses:
 *       200:
 *         description: Random book retrieved successfully
 */
fetchBookFromDBController.get("/books/random", getRandomBook);

export { fetchBookFromDBController };