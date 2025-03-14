import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import { createUserQuery, findUserQuery } from "@/database/query/user";
import { compareHash, hash } from "@/lib/hash";
import { generateNanoId } from "@/lib/nanoid";

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await findUserQuery({ username });

    if (existingUser) {
      res.status(409).json({ message: "User already exist!", data: null });
      return;
    }

    const hashedPassword = hash(password);

    const createdUser = await createUserQuery({
      id: generateNanoId(),
      username,
      password: hashedPassword,
      role,
    });

    const token = sign(
      { id: createdUser.id, username, role: createdUser.role },
      process.env.SECRET_KEY || "yanggelapkaubukanindonesia",
      { expiresIn: "1h" },
    );

    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({
        message: "Sign up success!",
        data: { user: createdUser, token },
      });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong!",
      data: null,
    });
  }
};

export const signInController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingUser = await findUserQuery({ username });

    if (
      !existingUser ||
      (existingUser && !compareHash(password, existingUser.password))
    ) {
      res.status(404).json({
        message: "Incorrect username or password!",
        data: null,
      });
      return;
    }

    const token = sign(
      { id: existingUser.id, username, role: existingUser.role },
      process.env.SECRET_KEY || "yanggelapkaubukanindonesia",
      { expiresIn: "1h" },
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

export const signOutController = async (_: Request, res: Response) => {
  try {
    res
      .status(200)
      .clearCookie("token")
      .json({ message: "Sign out success!", data: null });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong!",
      data: null,
    });
  }
};
