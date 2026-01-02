#!/usr/bin/env node

import redisClient from '../config/redis.config.js';
import { cache } from '../utils/cache.util.js';

const testRedis = async () => {
  try {
    console.log('🧪 Testing Redis connection...');
    
    // Connect to Redis
    await redisClient.connect();
    
    // Test basic operations
    console.log('📝 Testing cache operations...');
    
    // Set a test value
    await cache.set('test:key', { message: 'Hello Redis!' }, 60);
    
    // Get the test value
    const result = await cache.get('test:key');
    console.log('📖 Retrieved from cache:', result);
    
    // Delete the test value
    await cache.del('test:*');
    
    console.log('✅ Redis test completed successfully!');
    
    // Disconnect
    await redisClient.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Redis test failed:', error.message);
    process.exit(1);
  }
};

testRedis();