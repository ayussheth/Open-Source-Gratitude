import { z } from 'zod';
import { insertLetterSchema, letters } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  letters: {
    list: {
      method: 'GET' as const,
      path: '/api/letters' as const,
      responses: {
        200: z.array(z.custom<typeof letters.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/letters' as const,
      input: insertLetterSchema,
      responses: {
        201: z.custom<typeof letters.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/letters/:id' as const,
      responses: {
        200: z.custom<typeof letters.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
