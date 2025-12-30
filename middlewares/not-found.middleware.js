const notFound = (req, res, next) => {
  const { method, url, ip } = req;
  const timestamp = new Date().toISOString();
  
  console.log(`[${timestamp}] 404: ${method} ${url} - IP: ${ip}`);
  
  res.status(404).json({
    error: true,
    message: `Route ${method} ${url} not found`,
    timestamp,
    availableRoutes: {
      api: "/api/scrape, /api/fetch",
      docs: "/docs",
      health: "/healthz"
    }
  });
};

export { notFound };