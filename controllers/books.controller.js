import Book from "../models/book.model.js";

// Primary endpoint - handles most operations with query parameters
const getBooks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      q,
      minPrice,
      maxPrice,
      rating,
      inStock,
      sortBy = 'id',
      order = 'asc'
    } = req.query;

    let query = Book.find();

    // Search by title
    if (q) {
      query = Book.find({ title: { $regex: q } });
    }

    // Price filtering
    if (minPrice || maxPrice) {
      const priceFilter = {};
      if (minPrice) priceFilter.$gte = Number(minPrice);
      if (maxPrice) priceFilter.$lte = Number(maxPrice);
      query = Book.find({ price: priceFilter });
    }

    // Rating filtering
    if (rating) {
      query = Book.find({ rating: Number(rating) });
    }

    // Stock filtering
    if (inStock !== undefined) {
      query = Book.find({ stock: inStock === 'true' });
    }

    // Sorting
    const sortOrder = order === 'desc' ? -1 : 1;
    const result = await Book.findWithSort(sortBy, sortOrder, Number(limit));

    res.json({
      status: 200,
      message: "Books fetched successfully",
      data: result,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: result.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// Get single book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({
        error: true,
        message: "Book not found"
      });
    }

    res.json({
      status: 200,
      message: "Book fetched successfully",
      data: book
    });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// Get book statistics
const getBookStats = async (req, res) => {
  try {
    const stats = await Book.getStats();
    
    res.json({
      status: 200,
      message: "Statistics fetched successfully",
      data: stats
    });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// Get rating distribution
const getRatingStats = async (req, res) => {
  try {
    const ratingStats = await Book.getRatingDistribution();
    
    res.json({
      status: 200,
      message: "Rating statistics fetched successfully",
      data: ratingStats
    });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

// Get random book
const getRandomBook = async (req, res) => {
  try {
    const randomBook = await Book.getRandomBook();
    
    res.json({
      status: 200,
      message: "Random book fetched successfully",
      data: randomBook
    });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export {
  getBooks,
  getBookById,
  getBookStats,
  getRatingStats,
  getRandomBook
};