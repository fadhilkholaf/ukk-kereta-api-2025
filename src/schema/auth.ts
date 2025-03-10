import { Role } from "@prisma/client";
import z from "zod";

export const signUpSchema = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1),
    role: z.nativeEnum(Role).optional(),
  })
  .strict();

export const signInSchema = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1),
  })
  .strict();
