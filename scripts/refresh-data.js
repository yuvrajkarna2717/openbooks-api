#!/usr/bin/env node

import dotenv from 'dotenv';
import { ingestAllBooks } from '../utils/data-ingestion.util.js';
import { sanitizeAllBookDetails, saveIngestedBookDetailsToDB, clearAllBooks } from '../utils/data-processor.util.js';
import { cache } from '../utils/cache.util.js';
import redisClient from '../config/redis.config.js';

dotenv.config();

const validateEnvironment = () => {
  const requiredVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_DB_URL', 'WEBSITE_URL'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

const refreshBookData = async () => {
  const startTime = Date.now();
  console.log('🚀 Starting book data refresh process...');
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  
  try {
    // Validate environment
    validateEnvironment();
    console.log('✅ Environment validation passed');

    // Initialize Redis (optional for data refresh)
    try {
      await redisClient.connect();
      console.log('✅ Redis connected for cache invalidation');
    } catch (error) {
      console.warn('⚠️ Redis connection failed, continuing without cache invalidation');
    }

    // Step 1: Scrape all book data
    console.log('\n📖 Step 1: Scraping book data...');
    const allBooksDetails = await ingestAllBooks();
    
    if (!allBooksDetails || allBooksDetails.length === 0) {
      throw new Error('No books were scraped');
    }
    
    console.log(`✅ Successfully scraped ${allBooksDetails.length} books`);

    // Step 2: Sanitize and validate data
    console.log('\n🧹 Step 2: Sanitizing book data...');
    const sanitizedData = await sanitizeAllBookDetails(allBooksDetails);
    
    if (!sanitizedData || sanitizedData.length === 0) {
      throw new Error('No valid books after sanitization');
    }
    
    console.log(`✅ Successfully sanitized ${sanitizedData.length} books`);

    // Step 3: Clear existing data
    console.log('\n🗑️  Step 3: Clearing existing data...');
    const clearResult = await clearAllBooks();
    
    if (clearResult.message !== 'success') {
      throw new Error(`Failed to clear existing data: ${clearResult.error}`);
    }
    
    console.log(`✅ Cleared ${clearResult.deletedCount} existing books`);

    // Step 4: Save new data
    console.log('\n💾 Step 4: Saving new data to database...');
    const saveResult = await saveIngestedBookDetailsToDB(sanitizedData);
    
    if (saveResult.message !== 'success') {
      throw new Error(`Failed to save data: ${saveResult.error}`);
    }
    
    console.log(`✅ Successfully saved ${saveResult.count} books to database`);

    // Step 5: Invalidate cache
    console.log('\n🧹 Step 5: Invalidating cache...');
    try {
      if (redisClient.isReady()) {
        await cache.clear();
        console.log('✅ Cache invalidated successfully');
      } else {
        console.log('⚠️ Redis not available, skipping cache invalidation');
      }
    } catch (error) {
      console.warn('⚠️ Cache invalidation failed:', error.message);
    }

    // Success summary
    const duration = Math.round((Date.now() - startTime) / 1000);
    console.log('\n🎉 Data refresh completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   • Books scraped: ${allBooksDetails.length}`);
    console.log(`   • Books saved: ${saveResult.count}`);
    console.log(`   • Duration: ${duration} seconds`);
    console.log(`   • Completed at: ${new Date().toISOString()}`);
    
    process.exit(0);
    
  } catch (error) {
    const duration = Math.round((Date.now() - startTime) / 1000);
    console.error('\n❌ Data refresh failed!');
    console.error(`🔥 Error: ${error.message}`);
    console.error(`⏱️  Duration: ${duration} seconds`);
    console.error(`📅 Failed at: ${new Date().toISOString()}`);
    
    if (error.stack) {
      console.error('\n📋 Stack trace:');
      console.error(error.stack);
    }
    
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Start the refresh process
refreshBookData();