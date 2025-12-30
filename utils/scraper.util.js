import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

const scrapeCoreLogic = async (page, pageNumber) => {
  const WEBSITE_URL = process.env.WEBSITE_URL;
  const url = `${WEBSITE_URL}/catalogue/page-${pageNumber}.html`;
  await page.goto(url);

  const booksOnPage = await page.evaluate(() => {
    const bookElements = document.querySelectorAll(".product_pod");

    return Array.from(bookElements).map((book) => {
      const title = book.querySelector("h3 a").getAttribute("title");
      const price = book.querySelector(".price_color").textContent;
      const stock = book.querySelector(".instock.availability")
        ? "In Stock"
        : "Out Of Stock";
      const rating = book.querySelector(".star-rating").className.split(" ")[1];
      const link =
        `https://books.toscrape.com/catalogue/` +
        book.querySelector("h3 a").getAttribute("href");

      return {
        title,
        price,
        stock,
        rating,
        link,
      };
    });
  });

  for (let book of booksOnPage) {
    await page.goto(book.link);
    const stockInfo = await page.evaluate(() => {
      const stockInfoElement = document.querySelector(".instock.availability");
      return stockInfoElement
        ? stockInfoElement.innerText.trim()
        : "Unknown Stock Info";
    });
    book.stockInfo = stockInfo;

    const imageLink = await page.evaluate(() => {
      const imageLinkElement = document.querySelector(".item.active");

      // Find the img tag within the selected element
      const imgElement = imageLinkElement.querySelector("img");

      // Get the src attribute of the img tag
      return imgElement ? imgElement.src : null;
    });
    book.imageLink = imageLink;
  }

  return booksOnPage;
};

async function scrape() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let allBooks = [];
  let pageNumber = 1,
    totalPageNumber = 50;

  while (pageNumber <= totalPageNumber) {
    const booksOnPage = await scrapeCoreLogic(page, pageNumber);
    allBooks.push(...booksOnPage);
    pageNumber++;
  }

  await browser.close();
  return allBooks;
}

async function scrapeSinglePage(pageNumber = 1) {
  return scrapeFromPageXToPageY(pageNumber, pageNumber);
}

async function scrapeFromPageXToPageY(pageX = 1, pageY = 2) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let allBookDetails = [];

  for (let bookPage = pageX; bookPage <= pageY; bookPage++) {
    const booksOnPage = await scrapeCoreLogic(page, bookPage);
    allBookDetails.push(...booksOnPage);
  }

  await browser.close();
  return allBookDetails;
}

export { scrape, scrapeSinglePage, scrapeFromPageXToPageY };
