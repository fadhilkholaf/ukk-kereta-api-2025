import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

import authRoute from "@/routes/auth";
import userRoute from "@/routes/user";

import "dotenv/config";

const r = express();
const PORT = process.env.PORT || 8080;

r.use(express.json());
r.use(express.urlencoded({ extended: true }));
r.use(cookieParser());

r.get("/", (_: Request, res: Response) => {
  res.status(200).json({ message: process.cwd() });
});

r.use("/auth", authRoute);
r.use("/user", userRoute);

r.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default r;
