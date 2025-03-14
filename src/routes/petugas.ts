import express from "express";

import {
  createPetugasController,
  deletePetugasController,
  findManyPetugasController,
  findPetugasController,
  updatePetugasController,
} from "@/controllers/petugas";
import { auth } from "@/middleware/auth";
import { validate } from "@/middleware/validation";
import { createPetugasSchema, updatePetugasSchema } from "@/schema/petugas";

const r = express();

r.use(auth("private"));
r.get("/", findManyPetugasController);

r.use(auth("petugas"));
r.post("/", validate(createPetugasSchema), createPetugasController);
r.get("/:id", findPetugasController);
r.patch("/:id", validate(updatePetugasSchema), updatePetugasController);
r.delete("/:id", deletePetugasController);

export default r;
