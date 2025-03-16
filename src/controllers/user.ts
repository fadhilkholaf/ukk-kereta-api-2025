import { Request, Response } from "express";

import {
  createUserQuery,
  deleteUserQuery,
  findManyUserQuery,
  findUserQuery,
  updateUserQuery,
} from "@/database/query/user";
import { generateNanoId } from "@/lib/nanoid";
import { hash } from "@/lib/hash";

export const createUserController = async (req: Request, res: Response) => {
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

    res.status(201).json({ message: "User created!", data: createdUser });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await findUserQuery({ id });

    if (!user) {
      res.status(404).json({ message: "User not found!", data: null });
      return;
    }

    res.status(200).json({ message: "User found!", data: user });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findManyUserController = async (_: Request, res: Response) => {
  try {
    const users = await findManyUserQuery();

    res.status(200).json({ message: "User found!", data: users });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const { id } = req.params;

    const existingUser = await findManyUserQuery({
      OR: [{ id }, { username }],
    });

    if (!existingUser.length || !existingUser.some((u) => u.id === id)) {
      res.status(404).json({ message: "User not found!", data: null });
      return;
    }

    if (existingUser.length > 1) {
      res.status(409).json({
        message: "User with that username already exists!",
        data: null,
      });
      return;
    }

    const updatedUser = await updateUserQuery(
      { id },
      {
        username,
        password: password ? hash(password) : undefined,
        role,
      },
    );

    res.status(200).json({ message: "User updated!", data: updatedUser });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await findUserQuery({ id });

    if (!user) {
      res.status(404).json({ message: "User not found!", data: null });
      return;
    }

    await deleteUserQuery({ id });

    res.status(200).json({ message: "User deleted!", data: user });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};
