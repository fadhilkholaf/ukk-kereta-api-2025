import z from "zod";

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/constants";

const fileSchema = z.object({
  type: z.string(),
  size: z.number(),
});

export const signUpSchema = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1),
    files: z.array(z.unknown()).length(1),
  })
  .strict();
