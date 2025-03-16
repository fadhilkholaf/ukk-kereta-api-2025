import { Request, Response } from "express";

import { findJadwalQuery } from "@/database/query/jadwal";
import { findManyKursiIdQuery } from "@/database/query/kursi";
import { findPelangganQuery } from "@/database/query/pelanggan";
import { createPembelianTiketQuery } from "@/database/query/pembelian-tiket";
import { generateNanoId } from "@/lib/nanoid";

export const createPembelianTiketController = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      pelangganId,
      jadwalId,
      detailPembelianTiket,
    }: {
      pelangganId: string;
      jadwalId: string;
      detailPembelianTiket: {
        nik: string;
        namaPenumpang: string;
        kursiId: string;
      }[];
    } = req.body;

    const isDuplicatedPenumpang = detailPembelianTiket.some(
      (d, i) => detailPembelianTiket.map((m) => m.nik).indexOf(d.nik) !== i,
    );

    if (isDuplicatedPenumpang) {
      res
        .status(409)
        .json({ message: "Duplicated penumpang nik!", data: null });
      return;
    }

    const existingPelanggan = await findPelangganQuery({ id: pelangganId });

    if (!existingPelanggan) {
      res.status(404).json({ message: "Pelanggan not found!", data: null });
      return;
    }

    const existingJadwal = await findJadwalQuery({ id: jadwalId });

    if (!existingJadwal) {
      res.status(404).json({ message: "Jadwal not found!", data: null });
      return;
    }

    const existingKursi = await findManyKursiIdQuery({
      AND: [
        { id: { in: detailPembelianTiket.map((d) => d.kursiId) } },
        {
          gerbong: { kereta: { jadwal: { some: { id: jadwalId } } } },
        },
        { detailPembelianTiket: null },
      ],
    });

    if (existingKursi.length !== detailPembelianTiket.length) {
      res.status(404).json({
        message: "Some kursi not found in this kereta or already used!",
        data: null,
      });
      return;
    }

    const filteredDetailPembelianTiket = detailPembelianTiket.map((d) => {
      return { id: generateNanoId(), ...d };
    });

    const createdPembelianTiket = await createPembelianTiketQuery({
      id: generateNanoId(),
      pelanggan: { connect: { id: pelangganId } },
      jadwal: { connect: { id: jadwalId } },
      detailPembelianTiket: {
        createMany: { data: filteredDetailPembelianTiket },
      },
    });

    res.status(201).json({
      message: "Pembelian tiket created!",
      data: createdPembelianTiket,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};
