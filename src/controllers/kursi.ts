import { Request, Response } from "express";

import { findGerbongQuery } from "@/database/query/gerbong";
import {
  createKursiQuery,
  deleteKursiQuery,
  findKursiQuery,
  findManyKursiQuery,
  updateKursiQuery,
} from "@/database/query/kursi";
import { generateNanoId } from "@/lib/nanoid";

export const createKursiController = async (req: Request, res: Response) => {
  try {
    const { noKursi, gerbongId } = req.body;

    const existingGerbong = await findGerbongQuery({ id: gerbongId });

    if (!existingGerbong) {
      res.status(404).json({ message: "Gerbong not found!", data: null });
      return;
    }

    const createdKursi = await createKursiQuery({
      id: generateNanoId(),
      noKursi: Number(noKursi),
      gerbong: { connect: { id: gerbongId } },
    });

    res.status(201).json({ message: "Kursi created!", data: createdKursi });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findKursiController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const kursi = await findKursiQuery({ id });

    if (!kursi) {
      res.status(404).json({ message: "Kursi not found!", data: null });
      return;
    }

    res.status(200).json({ message: "Kursi found!", data: kursi });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findManyKursiController = async (req: Request, res: Response) => {
  try {
    const kursis = await findManyKursiQuery();

    res.status(200).json({ message: "Kursi found!", data: kursis });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const updateKursiController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { noKursi, gerbongId } = req.body;

    const existingKursi = await findKursiQuery({ id });

    if (!existingKursi) {
      res.status(404).json({ message: "Kursi not found!", data: null });
      return;
    }

    if (gerbongId) {
      const existingGerbong = await findGerbongQuery({ id: gerbongId });

      if (!existingGerbong) {
        res.status(404).json({ message: "Gerbong not found!", data: null });
        return;
      }
    }

    const updatedKursi = await updateKursiQuery(
      { id },
      {
        noKursi: Number(noKursi) || undefined,
        gerbong: gerbongId ? { connect: { id: gerbongId } } : undefined,
      },
    );

    res.status(200).json({ message: "Kursi updated!", data: updatedKursi });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const deleteKursiController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingKursi = await findKursiQuery({ id });

    if (!existingKursi) {
      res.status(404).json({ message: "Kursi not found!", data: null });
      return;
    }

    const deletedKursi = await deleteKursiQuery({ id });

    res.status(200).json({ message: "Kursi deleted!", data: deletedKursi });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};
