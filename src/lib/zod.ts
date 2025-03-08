import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const filesSchema = z.preprocess(
  (val) => {
    if (val instanceof FileList) return Array.from(val);
    return val;
  },
  z
    .array(z.instanceof(File))
    .min(1, { message: "At least one image is required." })
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      { message: ".jpg, .jpeg, .png and .webp files are accepted!" }
    )
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
      message: "Max file size is 5MB for each file!",
    })
);

export interface FilesSchema extends z.infer<typeof filesSchema> {}
