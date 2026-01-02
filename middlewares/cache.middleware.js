import { cache, generateCacheKey, TTL } from '../utils/cache.util.js';

// Cache middleware for different endpoint types
const cacheMiddleware = (cachePrefix, ttl = TTL.BOOKS_QUERY) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    try {
      // Generate cache key from route and query params
      const cacheKey = generateCacheKey(cachePrefix, req.query);
      
      // Try to get from cache
      const cachedData = await cache.get(cacheKey);
      
      if (cachedData) {
        // Cache hit - return cached data
        return res.json(cachedData);
      }

      // Cache miss - continue to route handler
      // Store original res.json to intercept response
      const originalJson = res.json;
      
      res.json = function(data) {
        // Cache the response data
        cache.set(cacheKey, data, ttl);
        
        // Call original res.json
        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error.message);
      // Continue without caching on error
      next();
    }
  };
};

// Specific cache middlewares for different endpoints
const booksCacheMiddleware = cacheMiddleware('books', TTL.BOOKS_QUERY);
const bookByIdCacheMiddleware = cacheMiddleware('book', TTL.BOOK_SINGLE);
const statsCacheMiddleware = cacheMiddleware('stats', TTL.STATS);
const randomCacheMiddleware = cacheMiddleware('random', TTL.RANDOM);

export {
  cacheMiddleware,
  booksCacheMiddleware,
  bookByIdCacheMiddleware,
  statsCacheMiddleware,
  randomCacheMiddleware
};