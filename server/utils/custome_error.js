// utils/createError.js
export function custome_error(message, statusCode = 500, res) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  error.isOperational = true;

  return error;
}
// Usage in your routes or controllers
