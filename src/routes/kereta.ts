import express from "express";

import {
  createKeretaController,
  deleteKeretaController,
  findKeretaController,
  findManyFilteredKeretaController,
  findManyKeretaController,
  updateKeretaController,
} from "@/controllers/kereta";
import { auth } from "@/middleware/auth";
import { validate } from "@/middleware/validation";
import {
  createKeretaSchema,
  filterKeretaSchema,
  updateKeretaSchema,
} from "@/schema/kereta";

const r = express();

r.use(auth("private"));
r.get("/", findManyKeretaController);
r.get(
  "/filter",
  validate(filterKeretaSchema),
  findManyFilteredKeretaController,
);

r.use(auth("petugas"));
r.post("/", validate(createKeretaSchema), createKeretaController);
r.get("/:id", findKeretaController);
r.patch("/:id", validate(updateKeretaSchema), updateKeretaController);
r.delete("/:id", deleteKeretaController);

export default r;
