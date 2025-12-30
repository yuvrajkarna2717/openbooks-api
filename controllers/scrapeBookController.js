import {
  saveScrapeBookDetailsToDB,
  sanitizeAllBookDetails,
} from "../utils/helper.js";
import {
  scrape,
  scrapeSinglePage,
  scrapeFromPageXToPageY,
} from "../utils/scrapper.js";

const scrapeBookDetailsAndSaveToDB = async (req, res) => {
  try {
    // const allBooksDetails = await scrapeSinglePage(1);
    const allBooksDetails = await scrape();

    const sanitizedData = await sanitizeAllBookDetails(allBooksDetails);

    const result = await saveScrapeBookDetailsToDB(sanitizedData);

    if (result.message === "success") {
      res.status(201).json({
        message: "successfully store all the scraped book details to DB.",
      });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const scrapeAllBookDetails = async (req, res) => {
  try {
    const allBooksDetails = await scrape();

    res.status(201).json({
      message: "success.",
      data: allBooksDetails,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const scrapeBookDetails = async (req, res) => {
  let { pageX, pageY } = req.query;

  if (!pageX)
    return res.status(420).json({
      status: 420,
      message: "please provide atleast pageX or both PageX and pageY.",
    });

  if (pageY) {
    try {
      const result = await scrapeFromPageXToPageY(pageX, pageY);

      return res.status(200).json({
        status: 200,
        message: "success",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    try {
      const result = await scrapeSinglePage(pageX);
      console.log("result: ", result);
      return res.status(200).json({
        status: 200,
        message: "success",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export {
  scrapeBookDetailsAndSaveToDB,
  scrapeAllBookDetails,
  scrapeBookDetails,
};
