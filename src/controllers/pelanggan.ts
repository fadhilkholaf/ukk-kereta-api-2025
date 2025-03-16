import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import {
  createPelangganQuery,
  deletePelangganQuery,
  findManyPelangganQuery,
  findPelangganQuery,
  updatePelangganQuery,
} from "@/database/query/pelanggan";
import { findUserQuery } from "@/database/query/user";
import { generateNanoId } from "@/lib/nanoid";

export const createPelangganController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { nik, namaPenumpang, alamat, telp, userId } = req.body;

    const existingUser = (await findUserQuery(
      { id: userId },
      { pelanggan: true },
    )) as Prisma.UserGetPayload<{ include: { pelanggan: true } }>;

    if (!existingUser) {
      res.status(404).json({ message: "User not found!", data: null });
      return;
    }

    if (existingUser.pelanggan) {
      res.status(409).json({
        message: "User already have a pelanggan!",
        data: null,
      });
      return;
    }

    const existingPelanggan = await findPelangganQuery({ nik });

    if (existingPelanggan) {
      res.status(409).json({
        message: "Pelanggan with that nik already exists!",
        data: null,
      });
      return;
    }

    const createdPelanggan = await createPelangganQuery({
      id: generateNanoId(),
      nik,
      namaPenumpang,
      alamat,
      telp,
      user: { connect: { id: userId } },
    });

    res
      .status(201)
      .json({ message: "Pelanggan created!", data: createdPelanggan });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findPelangganController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const pelanggan = await findPelangganQuery({ id });

    if (!pelanggan) {
      res.status(404).json({ message: "Pelanggan not found!", data: null });
      return;
    }

    res.status(200).json({ message: "Pelanggan found!", data: pelanggan });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findManyPelangganController = async (
  _: Request,
  res: Response,
) => {
  try {
    const pelanggan = await findManyPelangganQuery();

    res.status(200).json({ message: "Pelanggan found!", data: pelanggan });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const updatePelangganController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { nik, namaPenumpang, alamat, telp, userId } = req.body;
    const { id } = req.params;

    const existingPelanggan = await findManyPelangganQuery({
      OR: [{ id }, { nik }],
    });

    if (
      !existingPelanggan.length ||
      !existingPelanggan.some((p) => p.id === id)
    ) {
      res.status(404).json({
        message: "Pelanggan not found!",
        data: null,
      });
      return;
    }

    if (existingPelanggan.length > 1) {
      res.status(409).json({
        message: "Pelanggan with that nik already exists!",
        data: null,
      });
      return;
    }

    const updatedPelanggan = await updatePelangganQuery(
      { id },
      {
        nik,
        namaPenumpang,
        alamat,
        telp,
        user: userId ? { connect: { id: userId } } : undefined,
      },
    );

    res
      .status(200)
      .json({ message: "Pelanggan updated!", data: updatedPelanggan });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const deletePelangganController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const existingPelanggan = await findPelangganQuery({ id });

    if (!existingPelanggan) {
      res.status(404).json({
        message: "Pelanggan not found!",
        data: null,
      });
      return;
    }

    await deletePelangganQuery({ id });

    res
      .status(200)
      .json({ message: "Pelanggan deleted!", data: existingPelanggan });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};
