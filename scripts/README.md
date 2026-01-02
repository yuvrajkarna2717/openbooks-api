# Scripts

This directory contains utility scripts for the OpenBooks API project.

## refresh-data.js

Comprehensive data refresh script that:

- **Scrapes** all book data from books.toscrape.com (50 pages, 1000+ books)
- **Validates** and sanitizes the scraped data
- **Clears** existing database records
- **Inserts** fresh data with full error handling

### Usage

```bash
# Run manually
npm run refresh-data

# Or directly
node scripts/refresh-data.js
```

### Features

- ✅ **Comprehensive error handling** with retries
- ✅ **Environment validation** 
- ✅ **Progress logging** with detailed statistics
- ✅ **Data validation** and sanitization
- ✅ **Graceful failure handling**
- ✅ **Performance monitoring**

### Automated Execution

The script runs automatically every **Sunday at 2:00 AM IST** via GitHub Actions.

### Error Handling

- Network failures: 3 retries with exponential backoff
- Database errors: Detailed logging and graceful exit
- Validation errors: Skip invalid records, continue processing
- Environment errors: Fail fast with clear error messages

### Output

The script provides detailed console output including:
- Progress updates for each step
- Statistics (books scraped, sanitized, saved)
- Execution time and completion status
- Error details if failures occur