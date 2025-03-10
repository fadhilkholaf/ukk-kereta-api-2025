import { Role } from "@prisma/client";
import z from "zod";

// import { imageMaxSize, imageTypes } from "@/utils/constants";

export const signUpSchema = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1),
    role: z.nativeEnum(Role),
    // files: z
    //   .array(
    //     z.object({
    //       mimetype: z
    //         .string()
    //         .refine((type) => imageTypes.includes(type.split("/")[1])),
    //       size: z.number().min(1).max(imageMaxSize, "Max 1MB file size!"),
    //     })
    //   )
    //   .length(1),
  })
  .strict();

export const signInSchema = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1),
  })
  .strict();
