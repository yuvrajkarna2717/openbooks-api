
# openbooks-api

**openbooks-api** is an open-source backend platform that ingests publicly available book metadata from a demo source designed for scraping practice and exposes it through clean, well-documented REST APIs for learning, experimentation, and backend system design practic

# Data Source

This project currently ingests data from https://books.toscrape.com
, a public demo website explicitly created for web scraping practice.

The platform is intended for educational, learning, and open-source experimentation purposes only.
---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Web Scraping**: Leverage Puppeteer to scrape data from websites.
- **Real-Time Data Fetching**: Scrape and serve data directly from websites.
- **Database Integration**: Store scraped data in a MongoDB database for persistent access.
- **Flexible API**: Expose endpoints for retrieving and managing scraped data.
- **Modular Design**: Easily extend and integrate with other systems.

---

## Installation

Follow the steps below to get the **openbooks-api** up and running:

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v14+)
- **MongoDB** (local or cloud, such as MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/YuvrajKarna/ScrapeBackend-API.git
cd ScrapeBackend-API
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and set the following environment variables:

```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Replace `your_mongodb_connection_string` with your MongoDB connection URI.

### 4. Run the Development Server

```bash
npm run devStart
```

This will start the server on the specified port (`5000` by default) with hot reloading enabled.

---

## Usage

Once the server is running, you can interact with the API via HTTP requests. The API supports both real-time scraping and retrieving stored data.

### Example Request (GET)

To get a list of all scraped books from the database:

```bash
GET http://localhost:5000/api/scrape/books
```

---

## API Endpoints

### `/api/scrape/books` [GET]
- **Description**: Fetch all scraped book details from the database.
- **Response**: Returns an array of book objects.

```json
[
  {
    "title": "A Light in the Attic",
    "price": "£51.77",
    "stock": "In Stock",
    "rating": "Three",
    "link": "https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html",
    "stockInfo": "In stock (22 available)",
    "imageLink": "https://books.toscrape.com/media/cache/fe/72/fe72f0532301ec28892ae79a629a293c.jpg"
  },
  ...
]
```

### `/api/scrape/real-time` [POST]
- **Description**: Scrapes data from a provided URL and returns the result.
- **Request Body**:
  ```json
  {
    "url": "https://example.com"
  }
  ```
- **Response**: Returns the scraped data from the provided URL.

---

## Contributing

We welcome contributions to **openbooks-api**! If you'd like to help improve this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Create a pull request.

Please ensure your code is well-tested and follows the project's coding conventions.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Additional Notes:

- **Scalability**: The project is designed to scale easily. You can extend it to support more complex scraping logic, additional APIs, or more databases.
- **Error Handling**: Ensure you add proper error handling in your own code when interacting with the API.
- **Puppeteer**: Scraping performance can depend on the complexity of the target website. Puppeteer is used here for headless browser-based scraping, but you may need to tweak it for certain sites.

---
