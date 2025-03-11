import express from "express";

import { findManyUserController } from "@/controllers/user";
import { auth } from "@/middleware/auth";

const r = express();

r.use(auth("private"));
r.get("/", findManyUserController);

export default r;
