import { Request, Response } from "express";

import {
  createGerbongQuery,
  deleteGerbongQuery,
  findGerbongQuery,
  findManyGerbongQuery,
  updateGerbongQuery,
} from "@/database/query/gerbong";
import { findKeretaQuery } from "@/database/query/kereta";
import { generateNanoId } from "@/lib/nanoid";

export const createGerbongController = async (req: Request, res: Response) => {
  try {
    const { namaGerbong, kuota, keretaId } = req.body;

    const existingKereta = await findKeretaQuery({ id: keretaId });

    if (!existingKereta) {
      res.status(404).json({ message: "Kereta not found!", data: null });
      return;
    }

    const createdGerbong = await createGerbongQuery({
      id: generateNanoId(),
      namaGerbong,
      kuota: Number(kuota),
      kereta: { connect: { id: keretaId } },
    });

    res.status(201).json({ message: "Gerbong created!", data: createdGerbong });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findGerbongController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const gerbong = await findGerbongQuery({ id });

    if (!gerbong) {
      res.status(404).json({ message: "Gerbong not found!", data: null });
      return;
    }

    res.status(200).json({ message: "Gerbong found!", data: gerbong });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findManyGerbongController = async (_: Request, res: Response) => {
  try {
    const gerbongs = await findManyGerbongQuery();

    res.status(200).json({ message: "Gerbong found!", data: gerbongs });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const updateGerbongController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { namaGerbong, kuota, keretaId } = req.body;

    const gerbong = await findGerbongQuery({ id });

    if (!gerbong) {
      res.status(404).json({ message: "Gerbong not found!", data: null });
      return;
    }

    if (keretaId) {
      const existingKereta = await findKeretaQuery({ id: keretaId });

      if (!existingKereta) {
        res.status(404).json({ message: "Kereta not found!", data: null });
        return;
      }
    }

    const updatedGerbong = await updateGerbongQuery(
      { id },
      {
        namaGerbong,
        kuota: Number(kuota) || undefined,
        kereta: keretaId ? { connect: { id: keretaId } } : undefined,
      },
    );

    res.status(200).json({ message: "Gerbong updated!", data: updatedGerbong });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const deleteGerbongController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingGerbong = await findGerbongQuery({ id });

    if (!existingGerbong) {
      res.status(404).json({ message: "Gerbong not found!", data: null });
      return;
    }

    await deleteGerbongQuery({ id });

    res
      .status(200)
      .json({ message: "Gerbong deleted!", data: existingGerbong });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};
