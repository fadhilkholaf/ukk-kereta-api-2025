import express from "express";

import { signUp } from "@/controllers/auth";
import { validateRequest } from "@/middleware/validation";
import { signUpSchema } from "@/schema/auth";
import { upload } from "@/lib/multer";

const r = express();

r.post(
  "/signup",
  upload.single("photo"),
  validateRequest(signUpSchema),
  signUp
);

export default r;
