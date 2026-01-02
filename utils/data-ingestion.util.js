import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;
const PAGE_TIMEOUT = 30000;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ingestCoreLogic = async (page, pageNumber, retryCount = 0) => {
  try {
    const WEBSITE_URL = process.env.WEBSITE_URL;
    const url = `${WEBSITE_URL}/catalogue/page-${pageNumber}.html`;
    
    console.log(`Ingesting data from page ${pageNumber}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: PAGE_TIMEOUT });

    const booksOnPage = await page.evaluate(() => {
      const bookElements = document.querySelectorAll(".product_pod");

      return Array.from(bookElements).map((book) => {
        try {
          const titleElement = book.querySelector("h3 a");
          const priceElement = book.querySelector(".price_color");
          const stockElement = book.querySelector(".instock.availability");
          const ratingElement = book.querySelector(".star-rating");
          
          if (!titleElement || !priceElement || !ratingElement) {
            throw new Error('Missing required book elements');
          }

          const title = titleElement.getAttribute("title");
          const price = priceElement.textContent;
          const stock = stockElement ? "In Stock" : "Out Of Stock";
          const rating = ratingElement.className.split(" ")[1];
          const link = `https://books.toscrape.com/catalogue/` + titleElement.getAttribute("href");

          return { title, price, stock, rating, link };
        } catch (error) {
          console.warn(`Error parsing book element:`, error.message);
          return null;
        }
      }).filter(book => book !== null);
    });

    // Get detailed info for each book
    for (let i = 0; i < booksOnPage.length; i++) {
      const book = booksOnPage[i];
      try {
        await page.goto(book.link, { waitUntil: 'networkidle2', timeout: PAGE_TIMEOUT });
        
        const [stockInfo, imageLink] = await page.evaluate(() => {
          const stockInfoElement = document.querySelector(".instock.availability");
          const imageLinkElement = document.querySelector(".item.active img");
          
          return [
            stockInfoElement ? stockInfoElement.innerText.trim() : "Unknown Stock Info",
            imageLinkElement ? imageLinkElement.src : null
          ];
        });
        
        book.stockInfo = stockInfo;
        book.imageLink = imageLink;
        
        // Small delay to be respectful
        await delay(100);
      } catch (error) {
        console.warn(`Error getting details for book: ${book.title}`, error.message);
        book.stockInfo = "Unknown Stock Info";
        book.imageLink = null;
      }
    }

    console.log(`Successfully ingested ${booksOnPage.length} books from page ${pageNumber}`);
    return booksOnPage;
    
  } catch (error) {
    console.error(`Error ingesting page ${pageNumber}:`, error.message);
    
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying page ${pageNumber} (attempt ${retryCount + 1}/${MAX_RETRIES})...`);
      await delay(RETRY_DELAY * (retryCount + 1));
      return ingestCoreLogic(page, pageNumber, retryCount + 1);
    }
    
    throw new Error(`Failed to ingest page ${pageNumber} after ${MAX_RETRIES} attempts: ${error.message}`);
  }
};

async function ingestAllBooks() {
  let browser;
  try {
    console.log('Starting data ingestion process...');
    
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    let allBooks = [];
    let pageNumber = 1;
    const totalPageNumber = 50;
    const errors = [];

    while (pageNumber <= totalPageNumber) {
      try {
        const booksOnPage = await ingestCoreLogic(page, pageNumber);
        allBooks.push(...booksOnPage);
      } catch (error) {
        errors.push({ page: pageNumber, error: error.message });
        console.error(`Failed to ingest page ${pageNumber}:`, error.message);
      }
      pageNumber++;
    }

    console.log(`Data ingestion completed. Total books: ${allBooks.length}`);
    
    if (errors.length > 0) {
      console.warn(`Encountered ${errors.length} page errors:`, errors);
    }
    
    if (allBooks.length === 0) {
      throw new Error('No books were ingested successfully');
    }

    return allBooks;
    
  } catch (error) {
    console.error('Critical ingestion error:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function ingestSinglePage(pageNumber) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    return await ingestCoreLogic(page, pageNumber);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function ingestFromPageXToPageY(pageX, pageY) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    let allBooks = [];
    for (let pageNumber = parseInt(pageX); pageNumber <= parseInt(pageY); pageNumber++) {
      try {
        const booksOnPage = await ingestCoreLogic(page, pageNumber);
        allBooks.push(...booksOnPage);
      } catch (error) {
        console.error(`Failed to ingest page ${pageNumber}:`, error.message);
      }
    }
    
    return allBooks;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export { ingestAllBooks, ingestSinglePage, ingestFromPageXToPageY };
