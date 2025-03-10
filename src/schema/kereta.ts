import { Kelas } from "@prisma/client";
import z from "zod";

export const createKeretaSchema = z
  .object({
    namaKereta: z.string().min(1),
    deskripsi: z.string().min(1),
    kelas: z.nativeEnum(Kelas),
  })
  .strict();

export const updateKeretaSchema = z
  .object({
    namaKereta: z.string().min(1).optional(),
    deskripsi: z.string().min(1).optional(),
    kelas: z.nativeEnum(Kelas).optional(),
  })
  .strict();
