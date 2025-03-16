import { Request, Response } from "express";

import {
  createKeretaQuery,
  deleteKeretaQuery,
  findKeretaQuery,
  findManyKeretaQuery,
  updateKeretaQuery,
} from "@/database/query/kereta";
import { generateNanoId } from "@/lib/nanoid";
import { Prisma } from "@prisma/client";

export const createKeretaController = async (req: Request, res: Response) => {
  try {
    const { namaKereta, deskripsi, kelas } = req.body;

    const createdKereta = await createKeretaQuery({
      id: generateNanoId(),
      namaKereta,
      deskripsi,
      kelas,
    });

    res.status(201).json({ message: "Kereta created!", data: createdKereta });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findKeretaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const kereta = await findKeretaQuery({ id });

    if (!kereta) {
      res.status(404).json({ message: "Kereta not found!", data: null });
      return;
    }

    res.status(200).json({ message: "Kereta found!", data: kereta });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findManyKeretaController = async (_: Request, res: Response) => {
  try {
    const keretas = await findManyKeretaQuery();

    res.status(200).json({ message: "Kereta found!", data: keretas });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findManyFilteredKeretaController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { asalKeberangkatan, tujuanKeberangkatan, tanggalKeberangkatan } =
      req.body;

    const keretas = (await findManyKeretaQuery(
      {
        AND: [
          {
            jadwal: { some: { asalKeberangkatan } },
          },
          {
            jadwal: { some: { tujuanKeberangkatan } },
          },
          {
            jadwal: {
              some: {
                tanggalKeberangkatan: {
                  gte: new Date(tanggalKeberangkatan),
                },
              },
            },
          },
        ],
      },
      { jadwal: true },
    )) as Prisma.KeretaGetPayload<{ include: { jadwal: true } }>[];

    const formatedKereta = keretas.map((k) => {
      const thisTanggalKeberangkatan = k.jadwal.find(
        (j) => j.asalKeberangkatan === asalKeberangkatan,
      );

      const thisTanggalKedatangan = k.jadwal.find(
        (j) => j.tujuanKeberangkatan === tujuanKeberangkatan,
      );

      const sortedJadwal = k.jadwal.sort(
        (a, b) =>
          a.tanggalKeberangkatan.getTime() - b.tanggalKeberangkatan.getTime(),
      );

      const filteredJadwal = sortedJadwal.filter(
        (j) =>
          j.tanggalKeberangkatan.getTime() >=
            thisTanggalKeberangkatan!.tanggalKeberangkatan.getTime() &&
          j.tanggalKedatangan.getTime() <=
            thisTanggalKedatangan!.tanggalKedatangan.getTime(),
      );

      return { ...k, jadwal: filteredJadwal };
    });

    res.status(200).json({ message: "Kereta found!", data: formatedKereta });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const updateKeretaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { namaKereta, deskripsi, kelas } = req.body;

    const kereta = await findKeretaQuery({ id });

    if (!kereta) {
      res.status(404).json({ message: "Kereta not found!", data: null });
      return;
    }

    const updatedKereta = await updateKeretaQuery(
      { id },
      {
        namaKereta,
        deskripsi,
        kelas,
      },
    );

    res.status(200).json({ message: "Kereta updated!", data: updatedKereta });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const deleteKeretaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const exisitingKereta = await findKeretaQuery({ id });

    if (!exisitingKereta) {
      res.status(404).json({ message: "Kereta not found!", data: null });
      return;
    }

    await deleteKeretaQuery({ id });

    res.status(200).json({ message: "Kereta deleted!", data: exisitingKereta });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};
