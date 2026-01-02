import crypto from 'crypto';
import redisClient from '../config/redis.config.js';

// TTL configurations (in seconds)
const TTL = {
  BOOKS_QUERY: 3600,      // 1 hour
  BOOK_SINGLE: 86400,     // 24 hours  
  STATS: 21600,           // 6 hours
  RANDOM: 300             // 5 minutes
};

// Generate cache key from query parameters
const generateCacheKey = (prefix, params = {}) => {
  if (Object.keys(params).length === 0) {
    return `${prefix}:all`;
  }
  
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result, key) => {
      result[key] = params[key];
      return result;
    }, {});
  
  const paramString = JSON.stringify(sortedParams);
  const hash = crypto.createHash('md5').update(paramString).digest('hex');
  return `${prefix}:${hash}`;
};

// Cache operations
const cache = {
  async get(key) {
    try {
      if (!redisClient.isReady()) return null;
      
      const client = redisClient.getClient();
      const data = await client.get(key);
      
      if (data) {
        console.log(`🎯 Cache HIT: ${key}`);
        return JSON.parse(data);
      }
      
      console.log(`❌ Cache MISS: ${key}`);
      return null;
    } catch (error) {
      console.error('Cache GET error:', error.message);
      return null;
    }
  },

  async set(key, data, ttl = TTL.BOOKS_QUERY) {
    try {
      if (!redisClient.isReady()) return false;
      
      const client = redisClient.getClient();
      await client.setEx(key, ttl, JSON.stringify(data));
      console.log(`💾 Cache SET: ${key} (TTL: ${ttl}s)`);
      return true;
    } catch (error) {
      console.error('Cache SET error:', error.message);
      return false;
    }
  },

  async del(pattern) {
    try {
      if (!redisClient.isReady()) return 0;
      
      const client = redisClient.getClient();
      const keys = await client.keys(pattern);
      
      if (keys.length > 0) {
        const deleted = await client.del(keys);
        console.log(`🗑️ Cache DELETED: ${deleted} keys matching ${pattern}`);
        return deleted;
      }
      
      return 0;
    } catch (error) {
      console.error('Cache DELETE error:', error.message);
      return 0;
    }
  },

  async clear() {
    try {
      if (!redisClient.isReady()) return false;
      
      const client = redisClient.getClient();
      await client.flushAll();
      console.log('🧹 Cache CLEARED: All keys deleted');
      return true;
    } catch (error) {
      console.error('Cache CLEAR error:', error.message);
      return false;
    }
  }
};

export { cache, generateCacheKey, TTL };