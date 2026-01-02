import Book from "../models/book.model.js";

const sanitizeAllBookDetails = async (allBookDetails) => {
  console.log(`Sanitizing ${allBookDetails.length} books...`);
  
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

  const sanitizedBooks = allBookDetails
    .map((book, index) => {
      try {
        // Validate required fields
        if (!book.title || !book.price || !book.rating) {
          console.warn(`Skipping book at index ${index}: missing required fields`);
          return null;
        }

        // Extract and validate price
        const priceMatch = book.price.match(/[\d.]+/);
        if (!priceMatch) {
          console.warn(`Skipping book "${book.title}": invalid price format`);
          return null;
        }

        const price = parseFloat(priceMatch[0]);
        if (isNaN(price) || price <= 0) {
          console.warn(`Skipping book "${book.title}": invalid price value`);
          return null;
        }

        const rating = mapRatingToNumber(book.rating);
        if (rating === 0) {
          console.warn(`Book "${book.title}" has unknown rating: ${book.rating}`);
        }

        return {
          title: book.title.trim(),
          price: price,
          stock: book.stock === "In Stock",
          rating: rating,
          link: book.link || '',
          stockInfo: book.stockInfo || 'Unknown',
          imageLink: book.imageLink || null,
        };
      } catch (error) {
        console.error(`Error sanitizing book at index ${index}:`, error.message);
        return null;
      }
    })
    .filter(book => book !== null);

  console.log(`Successfully sanitized ${sanitizedBooks.length} books`);
  return sanitizedBooks;
};

const saveIngestedBookDetailsToDB = async (allBookDetails) => {
  try {
    console.log(`Saving ${allBookDetails.length} books to database...`);
    
    if (allBookDetails.length === 0) {
      throw new Error('No books to save');
    }

    await Book.insertMany(allBookDetails);
    console.log('Successfully saved all books to database');
    return { message: "success", count: allBookDetails.length };
  } catch (error) {
    console.error('Database save error:', error.message);
    return { message: "error", error: error.message };
  }
};

const clearAllBooks = async () => {
  try {
    console.log('Clearing existing books from database...');
    const deletedCount = await Book.deleteAll();
    console.log(`Cleared ${deletedCount} existing books`);
    return { message: "success", deletedCount };
  } catch (error) {
    console.error('Database clear error:', error.message);
    return { message: "error", error: error.message };
  }
};

export { saveIngestedBookDetailsToDB, sanitizeAllBookDetails, clearAllBooks };
