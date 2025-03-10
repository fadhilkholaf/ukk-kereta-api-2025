import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import { findUser } from "@/database/query/user";
import { compareHash } from "@/lib/hash";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;

    const existingUser = await findUser({ username });

    if (!existingUser) {
      res.status(404).json({
        message: "Incorrect username or password!",
        data: null,
      });
      return;
    }

    const isCorrectPassword = compareHash(password, existingUser.password);

    if (!isCorrectPassword) {
      res.status(404).json({
        message: "Incorrect username or password!",
        data: null,
      });
      return;
    }

    const token = sign(
      { id: existingUser.id, username, role: existingUser.role },
      process.env.SECRET_KEY || "yanggelapkaubukanindonesia",
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({
        message: "Sign in success!",
        data: { user: existingUser, token },
      });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong!",
      data: null,
    });
  }
};
