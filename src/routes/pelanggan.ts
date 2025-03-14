import express from "express";

import {
  createPelangganController,
  deletePelangganController,
  findManyPelangganController,
  findPelangganController,
  updatePelangganController,
} from "@/controllers/pelanggan";
import { auth } from "@/middleware/auth";
import { validate } from "@/middleware/validation";
import {
  createPelangganSchema,
  updatePelangganSchema,
} from "@/schema/pelanggan";

const r = express();

r.use(auth("private"));
r.get("/", findManyPelangganController);

r.use(auth("petugas"));
r.post("/", validate(createPelangganSchema), createPelangganController);
r.get("/:id", findPelangganController);
r.patch("/:id", validate(updatePelangganSchema), updatePelangganController);
r.delete("/:id", deletePelangganController);

export default r;
