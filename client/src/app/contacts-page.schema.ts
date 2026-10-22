import { z } from 'zod/mini';

export const contactsPageSchema = z.object({
  data: z.array(
    z.object({
      name: z.string(),
      email: z.email(),
      phone: z.string(),
    }),
  ),
  pagination: z.object({
    page: z.number().check(z.int(), z.positive()),
    limit: z.number().check(z.int(), z.positive()),
    totalItems: z.number().check(z.int(), z.nonnegative()),
    totalPages: z.number().check(z.int(), z.nonnegative()),
  }),
});

export type ContactsPage = z.infer<typeof contactsPageSchema>;
