import express from "express";

import {
  createPembelianTiketController,
  findPembelianTiketNotaController,
  findManyPembelianTiketHistoryController,
  findPembelianTiketPemasukanController,
} from "@/controllers/pembelian-tiket";
import { auth } from "@/middleware/auth";
import { validate } from "@/middleware/validation";
import {
  createPembelianTiketSchema,
  findManyPembelianTiketHistorySchema,
} from "@/schema/pembelian-tiket";

const r = express();

r.use(auth("private"));
r.post(
  "/",
  validate(createPembelianTiketSchema),
  createPembelianTiketController,
);
r.post(
  "/history",
  validate(findManyPembelianTiketHistorySchema),
  findManyPembelianTiketHistoryController,
);
r.get("/nota/:id", findPembelianTiketNotaController);

r.use(auth("petugas"));
r.post(
  "/pemasukan",
  validate(findManyPembelianTiketHistorySchema),
  findPembelianTiketPemasukanController,
);

export default r;
