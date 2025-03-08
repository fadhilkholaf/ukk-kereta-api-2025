import express from "express";

const r = express();

r.get("/user/:id");

export default r;
