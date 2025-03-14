import express from "express";

import {
  createUserController,
  deleteUserController,
  findManyUserController,
  findUserController,
  updateUserController,
} from "@/controllers/user";
import { auth } from "@/middleware/auth";
import { validate } from "@/middleware/validation";
import { createUserSchema, updateUserSchema } from "@/schema/user";

const r = express();

r.use(auth("petugas"));
r.post("/", validate(createUserSchema), createUserController);
r.get("/:id", findUserController);
r.get("/", findManyUserController);
r.patch("/:id", validate(updateUserSchema), updateUserController);
r.delete("/:id", deleteUserController);

export default r;
