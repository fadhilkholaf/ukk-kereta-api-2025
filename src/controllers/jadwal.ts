import { Request, Response } from "express";

import {
  createJadwalQuery,
  deleteJadwalQuery,
  findJadwalQuery,
  findManyJadwalQuery,
  updateJadwalQuery,
} from "@/database/query/jadwal";
import { findKeretaQuery } from "@/database/query/kereta";
import { generateNanoId } from "@/lib/nanoid";

export const createJadwalController = async (req: Request, res: Response) => {
  try {
    const {
      asalKeberangkatan,
      tujuanKeberangkatan,
      tanggalKeberangkatan,
      tanggalKedatangan,
      harga,
      keretaId,
    } = req.body;

    const existingKereta = await findKeretaQuery({ id: keretaId });

    if (!existingKereta) {
      res.status(404).json({ message: "Kereta not found!", data: null });
      return;
    }

    const createdJadwal = await createJadwalQuery({
      id: generateNanoId(),
      asalKeberangkatan,
      tujuanKeberangkatan,
      tanggalKeberangkatan: new Date(tanggalKeberangkatan),
      tanggalKedatangan: new Date(tanggalKedatangan),
      harga: Number(harga),
      kereta: { connect: { id: keretaId } },
    });

    res.status(201).json({ message: "Jadwal created!", data: createdJadwal });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findJadwalController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const jadwal = await findJadwalQuery({ id });

    if (!jadwal) {
      res.status(404).json({ message: "Jadwal not found!", data: null });
      return;
    }

    res.status(200).json({ message: "Jadwal found!", data: jadwal });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findManyJadwalController = async (_: Request, res: Response) => {
  try {
    const jadwals = await findManyJadwalQuery();

    res.status(200).json({ message: "Jadwals found!", data: jadwals });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const updateJadwalController = async (req: Request, res: Response) => {
  try {
    const {
      asalKeberangkatan,
      tujuanKeberangkatan,
      tanggalKeberangkatan,
      tanggalKedatangan,
      harga,
      keretaId,
    } = req.body;
    const { id } = req.params;

    const existingJadwal = await findJadwalQuery({ id });

    if (!existingJadwal) {
      res.status(404).json({ message: "Jadwal not found!", data: null });
      return;
    }

    if (keretaId) {
      const existingKereta = await findKeretaQuery({ id: keretaId });

      if (!existingKereta) {
        res.status(404).json({ message: "Kereta not found!", data: null });
        return;
      }
    }

    const updatedJadwal = await updateJadwalQuery(
      { id },
      {
        asalKeberangkatan,
        tujuanKeberangkatan,
        tanggalKeberangkatan: new Date(tanggalKeberangkatan),
        tanggalKedatangan: new Date(tanggalKedatangan),
        harga: Number(harga) || undefined,
        kereta: keretaId ? { connect: { id: keretaId } } : undefined,
      },
    );

    res.status(200).json({ message: "Jadwal updated!", data: updatedJadwal });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const deleteJadwalController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingJadwal = await findJadwalQuery({ id });

    if (!existingJadwal) {
      res.status(404).json({ message: "Jadwal not found!", data: null });
      return;
    }

    await deleteJadwalQuery({ id });

    res.status(200).json({ message: "Jadwal deleted!", data: existingJadwal });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};
