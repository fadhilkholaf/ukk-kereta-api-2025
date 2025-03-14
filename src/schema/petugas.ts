import z from "zod";

export const createPetugasSchema = z
  .object({
    namaPetugas: z.string().min(1),
    alamat: z.string().min(1),
    telp: z.string().min(1),
    userId: z.string().min(1),
  })
  .strict();

export const updatePetugasSchema = z
  .object({
    namaPetugas: z.string().min(1).optional(),
    alamat: z.string().min(1).optional(),
    telp: z.string().min(1).optional(),
    userId: z.string().min(1).optional(),
  })
  .strict();
