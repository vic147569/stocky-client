import { z } from 'zod';

export const formScema = z.object({
  email: z.string().min(1, { message: 'Name is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
});

export type UserFormData = z.infer<typeof formScema>;
