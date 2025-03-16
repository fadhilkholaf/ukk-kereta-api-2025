import express from "express";

import { createPembelianTiketController } from "@/controllers/pembelian-tiket";
import { auth } from "@/middleware/auth";
import { validate } from "@/middleware/validation";
import { createPembelianTiketSchema } from "@/schema/pembelian-tiket";

const r = express();

r.use(auth("private"));
r.post(
  "/",
  validate(createPembelianTiketSchema),
  createPembelianTiketController,
);

export default r;
