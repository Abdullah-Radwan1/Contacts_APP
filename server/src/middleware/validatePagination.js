import AppError from '../../utils/appError.js';
import { paginationQuerySchema } from '../../utils/zod.schema.js';

export function validatePagination(request, response, next) {
  const result = paginationQuerySchema.safeParse(request.query);

  if (!result.success) {
    next(
      new AppError('Invalid pagination parameters.', 400, result.error.issues),
    );
    return;
  }

  request.pagination = result.data;
  next();
}
