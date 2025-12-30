import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

import { rateLimiter } from "./middlewares/rateLimiterMiddleWare.js";

// book controller to scrape book details and save to DB
import { bookController } from "./routes/scrapeBookRoutes.js";

// fetch book details from DB
import { fetchBookFromDBController } from "./routes/booksFromDBRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
// connectDB();

const app = express();

app.use(cors());
app.use(rateLimiter);

// Middleware
app.use(express.json());

// Scrape book details and store to MongoDB
app.use("/api/scrape", bookController);

// fetch book details from mongoDB
app.use("/api/fetch", fetchBookFromDBController);

// to check health
app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "All APIs are working fine.",
    timestamp: new Date().toISOString(),
  });
});

// "/" it is just to give an idea that the project is up and running
app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: `Welcome to ScrapeBackend-API, Here we are trying to build a backend with many api's fetching data from scrapping a website ${process.env.WEBSITE_URL}`,
    exampleData: [
      {
        title: "A Light in the Attic",
        price: "£51.77",
        stock: "In Stock",
        rating: "Three",
        link: "https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html",
        stockInfo: "In stock (22 available)",
        imageLink:
          "https://books.toscrape.com/media/cache/fe/72/fe72f0532301ec28892ae79a629a293c.jpg",
        __v: 0,
        createdAt: {
          $date: "2024-12-30T07:09:30.914Z",
        },
        updatedAt: {
          $date: "2024-12-30T07:09:30.914Z",
        },
      },
    ],
    funFact: "api's are working fine.",
  });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };
