import express from "express";

import {
  createKursiController,
  deleteKursiController,
  findKursiController,
  findManyKursiController,
  updateKursiController,
} from "@/controllers/kursi";
import { auth } from "@/middleware/auth";
import { validate } from "@/middleware/validation";
import { createKursiSchema, updateKursiSchema } from "@/schema/kursi";

const r = express();

r.use(auth("private"));
r.get("/", findManyKursiController);

r.use(auth("petugas"));
r.post("/", validate(createKursiSchema), createKursiController);
r.get("/:id", findKursiController);
r.patch("/:id", validate(updateKursiSchema), updateKursiController);
r.delete("/:id", deleteKursiController);

export default r;
