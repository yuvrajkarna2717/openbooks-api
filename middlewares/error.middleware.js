const errorHandler = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, url, ip } = req;
  
  // Log error details
  console.error(`[${timestamp}] ERROR: ${method} ${url} - IP: ${ip}`);
  console.error(`Message: ${err.message}`);
  console.error(`Stack: ${err.stack}`);
  
  // Default error response
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  } else if (err.code === 'ENOTFOUND') {
    statusCode = 503;
    message = 'Service Unavailable';
  }
  
  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Something went wrong';
  }
  
  res.status(statusCode).json({
    error: true,
    message,
    timestamp,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

export { errorHandler };