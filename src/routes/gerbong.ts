import express from "express";

import {
  createGerbongController,
  deleteGerbongController,
  findGerbongController,
  findManyGerbongController,
  updateGerbongController,
} from "@/controllers/gerbong";
import { auth } from "@/middleware/auth";
import { validate } from "@/middleware/validation";
import { createGerbongSchema, updateGerbongSchema } from "@/schema/gerbong";

const r = express();

r.use(auth("private"));
r.get("/", findManyGerbongController);

r.use(auth("petugas"));
r.post("/", validate(createGerbongSchema), createGerbongController);
r.get("/:id", findGerbongController);
r.patch("/:id", validate(updateGerbongSchema), updateGerbongController);
r.delete("/:id", deleteGerbongController);

export default r;
