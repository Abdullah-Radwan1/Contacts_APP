// middlewares/globalErrorHandler.js
export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  // Ensure always JSON
  res.status(statusCode).json({
    status,
    message: err.message || "custome error message",
    // Uncomment below in dev only
    // stack: err.stack
  });
};
