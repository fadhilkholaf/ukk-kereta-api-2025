import { Request, Response } from "express";

import { findManyUserQuery } from "@/database/query/user";

export const findManyUserController = async (_: Request, res: Response) => {
  try {
    const users = await findManyUserQuery();

    res.status(200).json({ message: "User found!", data: users });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};
