import express from "express";

import {
  signInController,
  signUpController,
  signOutController,
} from "@/controllers/auth";
import { auth } from "@/middleware/auth";
import { validate } from "@/middleware/validation";
import { signInSchema, signUpSchema } from "@/schema/auth";

const r = express();

r.post("/signup", validate(signUpSchema), signUpController);
r.post("/signin", validate(signInSchema), signInController);
r.post("/signout", auth("private"), signOutController);

export default r;
