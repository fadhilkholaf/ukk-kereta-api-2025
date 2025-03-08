import bodyParser from "body-parser";
import express, { Request, Response } from "express";

import authRoute from "@/routes/auth";
import userRoute from "@/routes/user";

import "dotenv/config";

const r = express();
const PORT = process.env.PORT || 8080;

r.use(bodyParser.json());
r.use(bodyParser.urlencoded({ extended: true }));

r.get("/", (_: Request, res: Response) => {
  res.status(200).json({ message: process.cwd() });
});

r.use("/auth", authRoute);
r.use("/user", userRoute);

r.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
