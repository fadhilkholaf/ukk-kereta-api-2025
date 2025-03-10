import express from "express";

import {
  createKeretaController,
  deleteKeretaController,
  findKeretaController,
  updateKeretaController,
} from "@/controllers/kereta";
import { auth } from "@/middleware/auth";
import { validate } from "@/middleware/validation";
import { createKeretaSchema, updateKeretaSchema } from "@/schema/kereta";

const r = express();

r.post(
  "/create",
  auth("petugas"),
  validate(createKeretaSchema),
  createKeretaController
);
r.get("/:id", auth("petugas"), findKeretaController);
r.patch(
  "/:id",
  auth("petugas"),
  validate(updateKeretaSchema),
  updateKeretaController
);
r.delete("/:id", auth("petugas"), deleteKeretaController);

export default r;
