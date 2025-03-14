import { Role } from "@prisma/client";
import z from "zod";

export const createUserSchema = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1),
    role: z.nativeEnum(Role).optional(),
  })
  .strict();

export const updateUserSchema = z
  .object({
    username: z.string().min(1).optional(),
    password: z.string().min(1).optional(),
    role: z.nativeEnum(Role).optional(),
  })
  .strict();
