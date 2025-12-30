import express from "express";

import {
  getAllBooks,
  getBooksByTitle,
  getBooksByPriceRange,
  getBooksByRatingsRange,
  getBooksByLimit,
  getBooksBySorting,
} from "../controllers/booksFromDBController.js";

const fetchBookFromDBController = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: Fetch book data from database
 */

/**
 * @swagger
 * /api/fetch/all-books:
 *   get:
 *     tags: [Books]
 *     summary: Get all books
 *     description: Fetches all books stored in the database.
 *     responses:
 *       200:
 *         description: List of all books
 *       500:
 *         description: Internal server error
 */
fetchBookFromDBController.get("/all-books", getAllBooks);

/**
 * @swagger
 * /api/fetch/books/title:
 *   get:
 *     tags: [Books]
 *     summary: Get books by title
 *     description: Fetch books matching a given title.
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *           example: "A Light in the Attic"
 *         required: true
 *         description: Book title to search for
 *     responses:
 *       200:
 *         description: Matching books
 *       400:
 *         description: Missing or invalid title
 *       500:
 *         description: Internal server error
 */
fetchBookFromDBController.get("/books/title", getBooksByTitle);

/**
 * @swagger
 * /api/fetch/books/price-range:
 *   get:
 *     tags: [Books]
 *     summary: Get books by price range
 *     description: Fetch books within a given price range.
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           example: 10
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           example: 50
 *     responses:
 *       200:
 *         description: Books within price range
 *       400:
 *         description: Invalid price range
 *       500:
 *         description: Internal server error
 */
fetchBookFromDBController.get("/books/price-range", getBooksByPriceRange);

/**
 * @swagger
 * /api/fetch/books/rating-range:
 *   get:
 *     tags: [Books]
 *     summary: Get books by rating range
 *     description: Fetch books within a given rating range.
 *     parameters:
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: integer
 *           example: 2
 *       - in: query
 *         name: maxRating
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Books within rating range
 *       400:
 *         description: Invalid rating range
 *       500:
 *         description: Internal server error
 */
fetchBookFromDBController.get("/books/rating-range", getBooksByRatingsRange);

/**
 * @swagger
 * /api/fetch/books/limit:
 *   get:
 *     tags: [Books]
 *     summary: Get limited number of books
 *     description: Fetch a limited number of books.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         required: true
 *         description: Number of books to fetch
 *     responses:
 *       200:
 *         description: Limited list of books
 *       400:
 *         description: Invalid limit
 *       500:
 *         description: Internal server error
 */
fetchBookFromDBController.get("/books/limit", getBooksByLimit);

/**
 * @swagger
 * /api/fetch/books/sort:
 *   get:
 *     tags: [Books]
 *     summary: Sort books by price or rating
 *     description: Sort books in ascending or descending order by price or rating.
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [price, rating]
 *           example: price
 *         required: true
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: asc
 *         required: true
 *     responses:
 *       200:
 *         description: Sorted list of books
 *       400:
 *         description: Invalid sort parameters
 *       500:
 *         description: Internal server error
 */
fetchBookFromDBController.get("/books/sort", getBooksBySorting);

export { fetchBookFromDBController };
