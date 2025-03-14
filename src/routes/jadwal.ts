import express from "express";

import {
  createJadwalController,
  deleteJadwalController,
  findJadwalController,
  findManyJadwalController,
  updateJadwalController,
} from "@/controllers/jadwal";
import { auth } from "@/middleware/auth";
import { validate } from "@/middleware/validation";
import { createJadwalSchema, updateJadwalSchema } from "@/schema/jadwal";

const r = express();

r.use(auth("private"));
r.get("/", findManyJadwalController);

r.use(auth("petugas"));
r.post("/", validate(createJadwalSchema), createJadwalController);
r.get("/:id", findJadwalController);
r.patch("/:id", validate(updateJadwalSchema), updateJadwalController);
r.delete("/:id", deleteJadwalController);

export default r;
