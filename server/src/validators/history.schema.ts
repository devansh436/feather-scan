/*
  src/validator
  - only job is to validate external input
  - eg. db schema, HTTP req bodies, env vars, etc.
  - use 'zod' to enforce history record structure
*/

import { z } from 'zod';

export const addHistoryRecordSchema = z.object({
  modelType: z.string().min(1),
  prediction: z.object({
    label: z.string(),
    confidence: z.number().max(100),
  }),
});

