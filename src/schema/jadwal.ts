import z from "zod";

export const createJadwalSchema = z
  .object({
    asalKeberangkatan: z.string().min(1),
    tujuanKeberangkatan: z.string().min(1),
    tanggalKeberangkatan: z.date({ coerce: true }),
    tanggalKedatangan: z.date({ coerce: true }),
    harga: z.number({ coerce: true }).int().positive(),
    keretaId: z.string().min(1),
  })
  .strict();

export const updateJadwalSchema = z
  .object({
    asalKeberangkatan: z.string().min(1).optional(),
    tujuanKeberangkatan: z.string().min(1).optional(),
    tanggalKeberangkatan: z.date({ coerce: true }).optional(),
    tanggalKedatangan: z.date({ coerce: true }).optional(),
    harga: z.number({ coerce: true }).int().positive().optional(),
    keretaId: z.string().min(1).optional(),
  })
  .strict();
