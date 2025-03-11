import z from "zod";

export const createGerbongSchema = z
  .object({
    namaGerbong: z.string().min(1),
    kuota: z.number({ coerce: true }).int().positive(),
    keretaId: z.string().min(1),
  })
  .strict();

export const updateGerbongSchema = z
  .object({
    namaGerbong: z.string().min(1).optional(),
    kuota: z.number({ coerce: true }).int().positive().optional(),
    keretaId: z.string().min(1).optional(),
  })
  .strict();
