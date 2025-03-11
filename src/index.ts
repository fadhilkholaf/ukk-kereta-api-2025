import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

import authRoute from "@/routes/auth";
import keretaRoute from "@/routes/kereta";
import userRoute from "@/routes/user";
import gerbongRoute from "@/routes/gerbong";
import kursiRoute from "@/routes/kursi";

import "dotenv/config";

const PORT = process.env.PORT || 8080;
const r = express();

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

r.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
