import express from "express";

import {
  createJadwalController,
  findManyJadwalController,
} from "@/controllers/jadwal";
import { auth } from "@/middleware/auth";
import { validate } from "@/middleware/validation";
import { createJadwalSchema } from "@/schema/jadwal";

const r = express();

r.use(auth("private"));
r.get("/", findManyJadwalController);

r.use(auth("petugas"));
r.post("/", validate(createJadwalSchema), createJadwalController);

export default r;
