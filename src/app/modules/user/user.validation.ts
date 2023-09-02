import { z } from 'zod';
import { role } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string(),
    name: z.string(),
    role: z.enum([...role] as [string, ...string[]]),
    email: z.string(),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.string().optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
    email: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
