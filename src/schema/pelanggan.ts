import z from "zod";

export const createPelangganSchema = z
  .object({
    nik: z.string().min(1),
    namaPenumpang: z.string().min(1),
    alamat: z.string().min(1),
    telp: z.string().min(1),
    userId: z.string().min(1),
  })
  .strict();

export const updatePelangganSchema = z
  .object({
    nik: z.string().min(1).optional(),
    namaPenumpang: z.string().min(1).optional(),
    alamat: z.string().min(1).optional(),
    telp: z.string().min(1).optional(),
    userId: z.string().min(1).optional(),
  })
  .strict();
