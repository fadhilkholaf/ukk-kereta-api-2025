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
