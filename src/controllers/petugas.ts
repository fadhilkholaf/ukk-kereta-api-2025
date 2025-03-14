import { Request, Response } from "express";

import {
  createPetugasQuery,
  deletePetugasQuery,
  findManyPetugasQuery,
  findPetugasQuery,
  updatePetugasQuery,
} from "@/database/query/petugas";
import { findUserQuery } from "@/database/query/user";
import { generateNanoId } from "@/lib/nanoid";
import { Prisma } from "@prisma/client";

export const createPetugasController = async (req: Request, res: Response) => {
  try {
    const { namaPetugas, alamat, telp, userId } = req.body;

    const existingUser = (await findUserQuery(
      { id: userId },
      { petugas: true },
    )) as Prisma.UserGetPayload<{ include: { petugas: true } }>;

    if (!existingUser) {
      res.status(404).json({ message: "User not found!", data: null });
      return;
    }

    if (existingUser.petugas) {
      res.status(409).json({
        message: "User already have a petugas!",
        data: null,
      });
      return;
    }

    const createdPetugas = await createPetugasQuery({
      id: generateNanoId(),
      namaPetugas,
      alamat,
      telp,
      user: { connect: { id: userId } },
    });

    res.status(201).json({ message: "Petugas created!", data: createdPetugas });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findPetugasController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const petugas = await findPetugasQuery({ id });

    if (!petugas) {
      res.status(404).json({ message: "Petugas not found", data: null });
      return;
    }

    res.status(200).json({ message: "Petugas found!", data: petugas });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findManyPetugasController = async (_: Request, res: Response) => {
  try {
    const petugas = await findManyPetugasQuery();

    res.status(200).json({ message: "Petugas found!", data: petugas });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const updatePetugasController = async (req: Request, res: Response) => {
  try {
    const { namaPetugas, alamat, telp, userId } = req.body;
    const { id } = req.params;

    const existingPetugas = await findPetugasQuery({ id });

    if (!existingPetugas) {
      res.status(404).json({ message: "Petugas not found", data: null });
      return;
    }

    if (userId) {
      const existingUser = await findUserQuery({ id: userId });

      if (!existingUser) {
        res.status(404).json({ message: "User not found", data: null });
        return;
      }
    }

    const updatedPetugas = await updatePetugasQuery(
      { id },
      {
        namaPetugas,
        alamat,
        telp,
        user: userId ? { connect: { id: userId } } : undefined,
      },
    );

    res.status(200).json({ message: "Petugas updated!", data: updatedPetugas });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const deletePetugasController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingPetugas = await findPetugasQuery({ id });

    if (!existingPetugas) {
      res.status(404).json({ message: "Petugas not found", data: null });
      return;
    }

    await deletePetugasQuery({ id });

    res
      .status(200)
      .json({ message: "Petugas deleted!", data: existingPetugas });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};
