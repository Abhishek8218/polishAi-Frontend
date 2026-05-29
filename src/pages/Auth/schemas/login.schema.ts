import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Please enter a valid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
//   terms: z.boolean().refine((value) => value, {
//     message: 'You must agree to the Terms & Conditions',
//   }),
});

export type TLoginFormData = z.infer<typeof loginSchema>;