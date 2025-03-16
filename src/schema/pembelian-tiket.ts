import z from "zod";

export const createPembelianTiketSchema = z
  .object({
    pelangganId: z.string().min(1),
    jadwalId: z.string().min(1),
    detailPembelianTiket: z
      .array(
        z.object({
          nik: z.string().min(1),
          namaPenumpang: z.string().min(1),
          kursiId: z.string().min(1),
        }),
      )
      .min(1),
  })
  .strict();

export const findManyPembelianTiketHistorySchema = z
  .object({
    startDate: z.date({ coerce: true }).optional(),
    endDate: z.date({ coerce: true }).optional(),
  })
  .strict();
