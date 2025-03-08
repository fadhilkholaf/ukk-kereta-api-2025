import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { createUser, findUser } from "@/database/query/user";
import { hash } from "@/lib/hash";
import { generateNanoId } from "@/lib/nanoid";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;

    const existingUser = await findUser({ username });

    if (existingUser) {
      res.status(409).json({ message: "User already exist!", data: null });
      return;
    }

    const hashedPassword = hash(password);

    const createdUser = await createUser({
        id: generateNanoId(),
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: createdUser.id, username, role: createdUser.role },
      process.env.SECRET_KEY || "yanggelapkaubukanindonesia"
    );

    res
      .cookie("token", token, { httpOnly: true })
      .status(201)
      .json({ message: "User created!", data: { user: createdUser, token } });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};
