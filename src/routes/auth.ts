import express from "express";
// import multer from "multer";

import { signInController } from "@/controllers/auth/signin";
import { signOutController } from "@/controllers/auth/signout";
import { signUpController } from "@/controllers/auth/signup";
import { auth } from "@/middleware/auth";
import { validateRequest } from "@/middleware/validation";
import { signInSchema, signUpSchema } from "@/schema/auth";

const r = express();

r.post(
  "/signup",
  //   multer().any(),
  validateRequest(
    signUpSchema
    // , true
  ),
  signUpController
);
r.post("/signin", validateRequest(signInSchema), signInController);
r.post("/signout", auth("private"), signOutController);

export default r;
