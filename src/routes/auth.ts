import express from "express";
// import multer from "multer";

import { signIn } from "@/controllers/auth/signin";
import { signOut } from "@/controllers/auth/signout";
import { signUp } from "@/controllers/auth/signup";
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
  signUp
);
r.post("/signin", validateRequest(signInSchema), signIn);
r.post("/signout", auth("private"), signOut);

export default r;
