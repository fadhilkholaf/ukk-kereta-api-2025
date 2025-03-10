import { Request, Response } from "express";
// import fs from "fs";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
// import path from "path";

import { createUser, findUser } from "@/database/query/user";
import { hash } from "@/lib/hash";
import { generateNanoId } from "@/lib/nanoid";
// import { imageFolder } from "@/utils/constants";

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { username, password, role }: Prisma.UserCreateInput = req.body;

    // if (!req.files || !Array.isArray(req.files)) {
    //   res.status(400).json({ message: "Bad request!", data: null });
    //   return;
    // }

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
      role,
    });

    // if (!fs.existsSync(imageFolder)) {
    //   fs.mkdirSync(imageFolder, { recursive: true });
    // }

    // fs.writeFileSync(
    //   `${process.cwd()}/src/database/images/${createdUser.id}${path.extname(
    //     req.files[0].originalname
    //   )}`,
    //   req.files[0].buffer
    // );

    const token = jwt.sign(
      { id: createdUser.id, username, role: createdUser.role },
      process.env.SECRET_KEY || "yanggelapkaubukanindonesia",
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, { httpOnly: true })
      .status(201)
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
