import z from "zod";

export const createJadwalSchema = z
  .object({
    asalKeberangkatan: z.string().min(1),
    tujuanKeberangkatan: z.string().min(1),
    tanggalKeberangkatan: z.string().datetime(),
    tanggalKedatangan: z.string().datetime(),
    harga: z.number({ coerce: true }).int().positive(),
    keretaId: z.string().min(1),
  })
  .strict();

export const updateJadwalSchema = z
  .object({
    asalKeberangkatan: z.string().min(1).optional(),
    tujuanKeberangkatan: z.string().min(1).optional(),
    tanggalKeberangkatan: z.string().datetime().optional(),
    tanggalKedatangan: z.string().datetime().optional(),
    harga: z.number({ coerce: true }).int().positive().optional(),
    keretaId: z.string().min(1).optional(),
  })
  .strict();
