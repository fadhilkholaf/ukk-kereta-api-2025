import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { createKereta } from "@/database/query/kereta";
import { generateNanoId } from "@/lib/nanoid";

export const createKeretaController = async (req: Request, res: Response) => {
  try {
    const { namaKereta, deskripsi, kelas }: Prisma.KeretaCreateInput = req.body;

    const createdKereta = await createKereta({
      id: generateNanoId(),
      namaKereta,
      deskripsi,
      kelas,
    });

    res.status(201).json({ message: "Kereta created!", data: createdKereta });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};
