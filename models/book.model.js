import db from '../config/database.config.js';

class Book {
  static async find(conditions = {}) {
    let query = db('books');
    
    if (conditions.title && conditions.title.$regex) {
      query = query.whereILike('title', `%${conditions.title.$regex}%`);
    }
    if (conditions.price) {
      if (conditions.price.$gte) query = query.where('price', '>=', conditions.price.$gte);
      if (conditions.price.$lte) query = query.where('price', '<=', conditions.price.$lte);
    }
    if (conditions.rating) {
      if (conditions.rating.$gte) query = query.where('rating', '>=', conditions.rating.$gte);
      if (conditions.rating.$lte) query = query.where('rating', '<=', conditions.rating.$lte);
    }
    
    return await query;
  }

  static async findById(id) {
    return await db('books').where('id', id).first();
  }

  static async findWithLimit(limit) {
    return await db('books').limit(limit);
  }

  static async findWithSort(sortField, sortOrder, limit) {
    return await db('books')
      .orderBy(sortField, sortOrder === 1 ? 'asc' : 'desc')
      .limit(limit);
  }

  static async getStats() {
    const [totalBooks] = await db('books').count('* as count');
    const [avgPrice] = await db('books').avg('price as avgPrice');
    const [maxPrice] = await db('books').max('price as maxPrice');
    const [minPrice] = await db('books').min('price as minPrice');
    const [inStock] = await db('books').where('stock', true).count('* as count');
    
    return {
      totalBooks: totalBooks.count,
      averagePrice: parseFloat(avgPrice.avgPrice).toFixed(2),
      maxPrice: maxPrice.maxPrice,
      minPrice: minPrice.minPrice,
      inStock: inStock.count
    };
  }

  static async getRatingDistribution() {
    return await db('books')
      .select('rating')
      .count('* as count')
      .groupBy('rating')
      .orderBy('rating');
  }

  static async getRandomBook() {
    return await db('books').orderByRaw('RANDOM()').first();
  }

  static async insertMany(books) {
    return await db('books').insert(books);
  }

  static async deleteAll() {
    const deletedCount = await db('books').del();
    return deletedCount;
  }
}

export default Book;
