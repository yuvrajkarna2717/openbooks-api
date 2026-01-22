export const healthCheck = (_req, res) => {
  res.json({
    status: "success",
    message: "All APIs are working fine.",
    timestamp: new Date().toISOString(),
  });
};

export const rootroute = (_req, res) => {
  res.setHeader("Content-Type", "text/html");

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OpenBooks API</title>

  <style>
    :root {
      --bg: #0f172a;
      --card: #111827;
      --primary: #38bdf8;
      --text: #e5e7eb;
      --muted: #9ca3af;
      --border: #1f2933;
    }

    * {
      box-sizing: border-box;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    }

    body {
      margin: 0;
      background: linear-gradient(180deg, #020617, #020617 40%, #020617);
      color: var(--text);
    }

    .container {
      max-width: 1100px;
      margin: auto;
      padding: 48px 20px;
    }

    header {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 48px;
    }

    h1 {
      font-size: 2.6rem;
      margin: 0;
      color: white;
    }

    h1 span {
      color: var(--primary);
    }

    p.lead {
      color: var(--muted);
      max-width: 720px;
      line-height: 1.6;
    }

    .buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 16px;
    }

    .btn {
      padding: 10px 16px;
      border-radius: 8px;
      background: var(--primary);
      color: #020617;
      text-decoration: none;
      font-weight: 600;
    }

    .btn.secondary {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text);
    }

    section {
      margin-bottom: 48px;
    }

    h2 {
      margin-bottom: 16px;
      font-size: 1.6rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }

    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 18px;
    }

    .card h3 {
      margin-top: 0;
      font-size: 1.05rem;
    }

    .card p {
      color: var(--muted);
      font-size: 0.95rem;
      line-height: 1.5;
    }

    footer {
      border-top: 1px solid var(--border);
      padding-top: 24px;
      color: var(--muted);
      font-size: 0.9rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
    }

    code {
      background: #020617;
      padding: 4px 6px;
      border-radius: 6px;
      color: var(--primary);
    }
  </style>
</head>

<body>
  <div class="container">
    <header>
      <h1>📚 <span>OpenBooks API</span></h1>
      <p class="lead">
        An open-source, system-design–focused backend platform that ingests public book metadata
        and exposes it through clean, expressive, and production-ready REST APIs.
      </p>

      <div class="buttons">
        <a href="/docs" class="btn">Swagger Docs</a>
        <a href="/health" class="btn secondary">Health Check</a>
        <a href="https://github.com/yuvrajkarna2717/openbooks-api" target="_blank" class="btn secondary">
          GitHub
        </a>
      </div>
    </header>

    <section>
      <h2>✨ Key Features</h2>
      <div class="grid">
        <div class="card">
          <h3>RESTful APIs</h3>
          <p>Pagination, filtering, sorting, and search via a single expressive endpoint.</p>
        </div>
        <div class="card">
          <h3>Production Design</h3>
          <p>Rate limiting, migrations, error handling, logging, and clean architecture.</p>
        </div>
        <div class="card">
          <h3>Swagger Docs</h3>
          <p>Fully documented OpenAPI specification with interactive testing.</p>
        </div>
        <div class="card">
          <h3>Automated Ingestion</h3>
          <p>Scraping pipeline designed as a background data ingestion system.</p>
        </div>
      </div>
    </section>

    <section>
      <h2>🧱 Tech Stack</h2>
      <div class="grid">
        <div class="card"><code>Node.js</code> + <code>Express</code></div>
        <div class="card"><code>PostgreSQL</code> (Supabase)</div>
        <div class="card"><code>Knex.js</code> Migrations</div>
        <div class="card"><code>Puppeteer</code> Scraping</div>
        <div class="card"><code>Swagger</code> OpenAPI</div>
        <div class="card"><code>Vitest</code> Testing</div>
      </div>
    </section>

    <footer>
      <span>MIT Licensed · Open Source</span>
      <span>Built for backend system design practice</span>
    </footer>
  </div>
</body>
</html>
  `);
};
