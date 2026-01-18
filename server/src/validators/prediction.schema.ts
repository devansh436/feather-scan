import { z } from 'zod';

export const MLPredictionSchema = z.object({
  label: z.string().min(1),
  confidence: z.number(),
})