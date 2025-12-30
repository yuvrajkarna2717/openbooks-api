import db from '../config/db.js';

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

  static async findWithLimit(limit) {
    return await db('books').limit(limit);
  }

  static async findWithSort(sortField, sortOrder, limit) {
    return await db('books')
      .orderBy(sortField, sortOrder === 1 ? 'asc' : 'desc')
      .limit(limit);
  }

  static async insertMany(books) {
    return await db('books').insert(books);
  }
}

export default Book;
