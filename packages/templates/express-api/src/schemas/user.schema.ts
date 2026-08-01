import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.email('Invalid email address'),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
