export const rootroute = (_req, res) => {
  res.json({
    message: `OpenBooks API – Public book data service`,
    docs: "/docs",
    health: "/health",
  });
};

export const healthCheck = (_req, res) => {
  res.json({
    status: "success",
    message: "All APIs are working fine.",
    timestamp: new Date().toISOString(),
  });
};
