import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";

import authRoute from "@/routes/auth";
import keretaRoute from "@/routes/kereta";
import userRoute from "@/routes/user";
import gerbongRoute from "@/routes/gerbong";
import kursiRoute from "@/routes/kursi";
import jadwalRoute from "@/routes/jadwal";
import petugasRoute from "@/routes/petugas";
import pelangganRoute from "@/routes/pelanggan";
import pembelianTiketRoute from "@/routes/pembelian-tiket";

import "dotenv/config";

const PORT = process.env.PORT || 8080;
const r = express();

r.use(cors());
r.use(express.json());
r.use(express.urlencoded({ extended: true }));
r.use(cookieParser());

r.get("/", (_: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Kereta Jes Gejes API", data: { version: "0.1.0" } });
});

r.use("/auth", authRoute);
r.use("/kereta", keretaRoute);
r.use("/user", userRoute);
r.use("/gerbong", gerbongRoute);
r.use("/kursi", kursiRoute);
r.use("/jadwal", jadwalRoute);
r.use("/petugas", petugasRoute);
r.use("/pelanggan", pelangganRoute);
r.use("/pembelian-tiket", pembelianTiketRoute);

r.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default r;
