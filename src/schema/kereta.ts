import { Kelas } from "@prisma/client";
import z from "zod";

export const createKeretaSchema = z.object({
  namaKereta: z.string().min(1),
  deskripsi: z.string().min(1),
  kelas: z.nativeEnum(Kelas),
});
