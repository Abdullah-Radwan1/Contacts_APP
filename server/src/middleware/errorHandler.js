import AppError from '../../utils/appError.js';

export function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    next(error);
    return;
  }

  console.error(error);

  const isAppError = error instanceof AppError;
  const statusCode = isAppError ? error.statusCode : 500;
  const message = isAppError
    ? error.message
    : 'An unexpected server error occurred.';
  const payload = { error: { message } };

  if (isAppError && error.details) {
    payload.error.details = error.details;
  }

  response.status(statusCode).json(payload);
}
