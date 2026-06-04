// types/framework.ts
import { z } from 'zod';

export const createFrameworkSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  prompt: z.string().min(10, "Prompt must be at least 10 characters").max(5000),
  tone: z.enum([
    "NEUTRAL", "PROFESSIONAL", "CASUAL", "FRIENDLY", "FORMAL",
    "CONVERSATIONAL", "ASSERTIVE", "EMPATHETIC"
  ]),
  formalityLevel: z.number().min(1).max(100),
  creativityLevel: z.number().min(1).max(100),
  lengthPreference: z.enum(["SHORTER", "ORIGINAL", "LONGER", "CONCISE", "ADD_MORE"]),
  preserveStyle: z.boolean(),
  enhanceClarity: z.boolean(),
});

export type CreateFrameworkInput = z.infer<typeof createFrameworkSchema>;
export type UpdateFrameworkInput = Partial<CreateFrameworkInput>;

export interface Framework {
  id: string;
  name: string;
  prompt: string;
  description?: string;
  tone: string;
  formalityLevel: number;
  creativityLevel: number;
  lengthPreference: string;
  preserveStyle: boolean;
  enhanceClarity: boolean;
  tags?: string[];
}