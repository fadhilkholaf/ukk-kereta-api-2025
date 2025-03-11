import { Request, Response } from "express";

import {
  createJadwalQuery,
  findManyJadwalQuery,
} from "@/database/query/jadwal";
import { findKeretaQuery } from "@/database/query/kereta";
import { generateNanoId } from "@/lib/nanoid";
import { gmtToWib } from "@/utils/wib";

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
      tanggalKeberangkatan: gmtToWib(new Date(tanggalKeberangkatan)),
      tanggalKedatangan: gmtToWib(new Date(tanggalKedatangan)),
      harga: Number(harga),
      kereta: { connect: { id: keretaId } },
    });

    res.status(201).json({ message: "Jadwal created!", data: createdJadwal });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findManyJadwalController = async (req: Request, res: Response) => {
  try {
    const jadwals = await findManyJadwalQuery();

    res.status(200).json({ message: "Jadwals found!", data: jadwals });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};
