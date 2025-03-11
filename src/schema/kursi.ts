import z from "zod";

export const createKursiSchema = z
  .object({
    noKursi: z.number({ coerce: true }).int().positive(),
    gerbongId: z.string().min(1),
  })
  .strict();

export const updateKursiSchema = z
  .object({
    noKursi: z.number({ coerce: true }).int().positive().optional(),
    gerbongId: z.string().min(1).optional(),
  })
  .strict();
