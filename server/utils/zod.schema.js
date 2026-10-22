import { z } from 'zod';

const positiveIntegerQuery = (maximum, defaultValue) =>
  z
    .string()
    .regex(/^[1-9]\d*$/)
    .default(String(defaultValue))
    .transform(Number)
    .pipe(z.number().int().max(maximum));

export const paginationQuerySchema = z.object({
  page: positiveIntegerQuery(1_000_000, 1),
  limit: positiveIntegerQuery(100, 5),
});
