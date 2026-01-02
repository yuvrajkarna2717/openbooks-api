# 📚 OpenBooks API

**OpenBooks API** is an open-source backend platform that ingests publicly available book metadata from a demo source designed for scraping practice and exposes it through clean, well-documented REST APIs. The project focuses on real-world backend system design, including data ingestion, API usability, performance optimization, and maintainability.

Rather than treating scraping as the end goal, this project models how production systems collect external data, normalize it, store it reliably, and make it accessible to other services or developers via stable APIs.

---

## ✨ Key Features

* RESTful APIs for consuming book data
* Pagination, filtering, sorting, and search
* Rate limiting for API protection
* Swagger (OpenAPI) documentation
* Database migrations with Knex.js
* CORS support for cross-origin requests
* Robust error handling and logging
* Comprehensive test suite
* Open-source and contributor-friendly

---

## 📊 Dataset

* **Source:** [https://books.toscrape.com](https://books.toscrape.com)
* **Records:** 1,000+ books across 50 pages
* **Purpose:** Educational and system design practice

> ⚠️ The data source is a public demo website explicitly created for web scraping practice.

---

## 🧱 Tech Stack

* **Backend:** Node.js, Express
* **Database:** Supabase (PostgreSQL)
* **Query Builder:** Knex.js
* **Web Scraping:** Puppeteer
* **Documentation:** Swagger (OpenAPI)
* **Testing:** Vitest
* **Containerization:** Docker
* **CI/CD:** Github Actions

---

## 📌 API Overview

![Swagger API Documentation](./assets/swagger-api-docs.png)

### 🔹 Primary Endpoint (Does Most of the Work)

```http
GET /api/fetch/books
```

Supports:
* Pagination (`page`, `limit`)
* Search (`q`)
* Filtering (`minPrice`, `maxPrice`, `rating`, `inStock`)
* Sorting (`sortBy`, `order`)

👉 This **single endpoint replaces ~15 narrow APIs**.

### 🔹 Secondary Endpoints (Conceptually Different)

**Resource**
* `GET /api/fetch/books/:id` - Get single book

**Aggregations / Analytics**
* `GET /api/fetch/books/stats` - Collection statistics
* `GET /api/fetch/books/stats/ratings` - Rating distribution

**Utility / Platform**
* `GET /api/fetch/books/random` - Random book
* `GET /api/meta` - API metadata
* `GET /healthz` - Health check

**Data Ingestion**
* Automated via GitHub Actions (weekly)
* Manual execution: `npm run refresh-data`

> The API surface is intentionally kept small and expressive to reflect real-world REST API design.

---

## 📖 API Documentation

The API is fully documented using **Swagger (OpenAPI)**.

* **Swagger UI:**

  ```
  http://localhost:<PORT>/docs
  ```

All endpoints, query parameters, and responses can be explored and tested directly from the browser.

---

## 🧠 System Design Highlights

* Data ingestion treated as a background pipeline, not a one-off script
* Relational schema with indexed fields for performance
* Rate limiting to protect public APIs
* Clear separation between ingestion and consumption layers
* Modular architecture with proper separation of concerns
* Environment-based configuration management

---

## 🧪 Local Development

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yuvrajkarna2717/openbooks-api.git
cd openbooks-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

```bash
cp .example.env .env
```

Update the values with your Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_DB_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
PORT=5000
WEBSITE_URL=https://books.toscrape.com
MAX_REQUEST_PER_IP=100
```

### 4️⃣ Setup Database

```bash
npm run migrate
```

### 5️⃣ Run the Server

```bash
npm run devStart
```

---

## 🐳 Docker (Planned)

```bash
docker build -t openbooks-api .
docker run -p 5000:5000 openbooks-api
```

---

## 🧪 Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

---

## 🤝 Contributing

Contributions are welcome 🎉

You can help by:

* Improving API documentation
* Adding new filters or aggregations
* Optimizing database queries
* Writing comprehensive tests
* Enhancing error handling

Please see [`CONTRIBUTING.md`](./CONTRIBUTING.md) for guidelines.

---

## 🧭 Roadmap

* [ ] Redis caching for read-heavy endpoints
* [ ] Scheduled data refresh using GitHub Actions
* [ ] Enhanced analytics and aggregation endpoints
* [ ] Data quality validation checks
* [ ] Public Docker image
* [ ] Performance monitoring and metrics

---

## ⚖️ Ethical Data Collection

* Uses a public demo website created for scraping practice
* No authentication, paywalls, or private data involved
* Requests are rate-limited to be respectful
* Intended strictly for educational and open-source use
* Follows robots.txt guidelines and best practices

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Why This Project Exists

OpenBooks API was built to practice and demonstrate **real backend system design**—where data ingestion is only the first step, and the real challenge lies in building reliable, performant, and maintainable APIs that others can use and extend.

The project showcases:
- **Clean Architecture**: Separation of concerns with proper layering
- **API Design**: RESTful principles with consistent response formats
- **Data Management**: Proper database design with migrations
- **Error Handling**: Comprehensive error management and logging
- **Testing**: Test-driven development practices
- **Documentation**: Self-documenting APIs with Swagger

This serves as a practical example for backend engineers learning system design, API development, and modern Node.js practices.

---