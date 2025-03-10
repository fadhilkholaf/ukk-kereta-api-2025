import express from "express";

import { createKeretaController } from "@/controllers/kereta";
import { auth } from "@/middleware/auth";
import { validateRequest } from "@/middleware/validation";
import { createKeretaSchema } from "@/schema/kereta";

const r = express();

r.post(
  "/create",
  auth("petugas"),
  validateRequest(createKeretaSchema),
  createKeretaController
);

export default r;
