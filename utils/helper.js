import Book from "../models/bookModel.js";

const sanitizeAllBookDetails = async (allBookDetails) => {
  const mapRatingToNumber = (rating) => {
    const ratingMap = {
      One: 1,
      Two: 2,
      Three: 3,
      Four: 4,
      Five: 5,
    };
    return ratingMap[rating] || 0;
  };

  const sanitizedBooks = allBookDetails.map((book) => {
    return {
      title: book.title,
      price: parseFloat(book.price.replace(/[^\d.]/g, "")),
      stock: book.stock === "In Stock",
      rating: mapRatingToNumber(book.rating),
      link: book.link,
      stockInfo: book.stockInfo,
      imageLink: book.imageLink,
    };
  });

  return sanitizedBooks;
};

const saveScrapeBookDetailsToDB = async (allBookDetails) => {
  try {
    await Book.insertMany(allBookDetails);
    return { message: "success" };
  } catch (error) {
    return { message: "error", error: error.message };
  }
};

export { saveScrapeBookDetailsToDB, sanitizeAllBookDetails };
