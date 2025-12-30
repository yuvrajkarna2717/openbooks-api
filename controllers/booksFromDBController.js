import Book from "../models/bookModel.js";

// Return all book details
const getAllBooks = async (req, res) => {
  try {
    const result = await Book.find();
    if (!result || result.length <= 0) {
      return res.status(200).json({
        status: 200,
        message: "There is no book details in DB.",
        data: [],
      });
    }
    res
      .status(200)
      .json({ status: 200, message: "all books fetched.", data: result });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error." });
  }
};

// Fetch books by title
const getBooksByTitle = async (req, res) => {
  try {
    const { title } = req.query; // Extract the title from the query parameters

    if (!title) {
      return res.status(400).json({
        status: 400,
        message: "Title query parameter is required.",
      });
    }

    // Use a case-insensitive regex to find books with a matching title
    const books = await Book.find({
      title: { $regex: title }
    });

    if (books.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No books found with the given title.",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Books fetched successfully by title.",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error.",
    });
  }
};

// Fetch books by price range (query: minPrice=x, maxPrice=y)
const getBooksByPriceRange = async (req, res) => {
  try {
    let { minPrice, maxPrice } = req.query;

    // Convert query parameters to numbers
    minPrice = Number(minPrice);
    maxPrice = Number(maxPrice);

    if (!minPrice || isNaN(minPrice)) {
      return res
        .status(400)
        .json({ status: 400, message: "minPrice is required." });
    }
    if (!maxPrice || isNaN(maxPrice)) {
      return res
        .status(400)
        .json({ status: 400, message: "maxPrice is required." });
    }

    if (minPrice > maxPrice) {
      return res.status(400).json({
        status: 400,
        message: "minPrice must be lower than or equal to maxPrice.",
      });
    }

    const result = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    if (!result) {
      return res.status(200).json({
        status: 200,
        message: `There are no book details in between ${minPrice} & ${maxPrice}.`,
      });
    }

    res.status(200).json({
      status: 200,
      message: `All books details between ${minPrice} and ${maxPrice} are fetched.`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// Fetch books by ratings range (query: minRating=x, maxRating=y)
const getBooksByRatingsRange = async (req, res) => {
  try {
    let { minR, maxR } = req.query;

    // Convert query parameters to numbers
    minR = Number(minR);
    maxR = Number(maxR);

    if (!minR || isNaN(minR)) {
      return res
        .status(400)
        .json({ status: 400, message: "minR is required." });
    }
    if (!maxR || isNaN(maxR)) {
      return res
        .status(400)
        .json({ status: 400, message: "maxR is required." });
    }

    if (minR > maxR) {
      return res.status(400).json({
        status: 400,
        message: "minR must be lower than or equal to maxR.",
      });
    }

    const result = await Book.find({
      rating: { $gte: minR, $lte: maxR },
    });

    if (!result) {
      return res.status(200).json({
        status: 200,
        message: `There are no book details in between ${minR} & ${maxR}.`,
      });
    }

    res.status(200).json({
      status: 200,
      message: `All books details between ratings ${minR} and ${maxR} are fetched.`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// Fetch limited number of books (query: limit=10)
const getBooksByLimit = async (req, res) => {
  try {
    let { limit } = req.query;

    limit = Number(limit);

    if (!limit || isNaN(limit)) {
      return res.status(400).json({
        status: 400,
        message: "limit is required and must be number.",
      });
    }

    if (limit > 1000) {
      return res.status(400).json({
        status: 400,
        message: "limit must be less than or equal to 1000.",
      });
    }

    const result = await Book.findWithLimit(limit);
    res.status(200).json({
      status: 200,
      message: `${limit} book(s) details fetched.`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

// Fetch books sorted by price or rating (query: sortBy=price|rating, order=asc|desc)
const getBooksBySorting = async (req, res) => {
  try {
    let { sortBy, orderBy, limit } = req.query;
    const priceRegex = /price/i;
    const ratingRegex = /rating/i;
    const ascOrderRegex = /asc/i;
    const dscOrderRegex = /dsc/i;

    if (!priceRegex.test(sortBy) && !ratingRegex.test(sortBy)) {
      return res.status(400).json({
        message: "sortBy must be either 'price' or 'rating', case-insensitive",
      });
    }

    if (!ascOrderRegex.test(orderBy) && !dscOrderRegex.test(orderBy)) {
      return res.status(400).json({
        message: "orderBy must be either 'asc' or 'dsc', case-insensitive",
      });
    }

    limit = Number(limit);

    if (!limit || isNaN(limit)) {
      return res.status(400).json({
        status: 400,
        message: "limit is required and must be number.",
      });
    }

    if (limit > 1000) {
      return res.status(400).json({
        status: 400,
        message: "limit must be less than or equal to 1000.",
      });
    }

    const sortOrder = ascOrderRegex.test(orderBy) ? 1 : -1;
    const sortField = priceRegex.test(sortBy) ? "price" : "rating";

    const result = await Book.findWithSort(sortField, sortOrder, limit);

    res.status(200).json({
      status: 200,
      message: `Sucessfully required data(s) are fetched.`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export {
  getAllBooks,
  getBooksByTitle,
  getBooksByPriceRange,
  getBooksByRatingsRange,
  getBooksByLimit,
  getBooksBySorting,
};
