import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Prisma } from "@prisma/client";

import { findJadwalQuery } from "@/database/query/jadwal";
import { findManyKursiIdQuery } from "@/database/query/kursi";
import { findPelangganQuery } from "@/database/query/pelanggan";
import {
  createPembelianTiketQuery,
  findManyPembelianTiketQuery,
  findPembelianTiketQuery,
} from "@/database/query/pembelian-tiket";
import { generateNanoId } from "@/lib/nanoid";
import { AuthToken } from "@/types/auth";
import { gmtToWib, wibFormat, wibToGmt } from "@/utils/wib";
import { rupiah } from "@/utils/rupiah";

GlobalFonts.registerFromPath(
  `${process.cwd()}/src/fonts/GeistMono-Regular.ttf`,
  "Geist Mono",
);

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

export const findManyPembelianTiketHistoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { startDate, endDate } = req.body;
    const { token } = req.cookies;

    const decodedToken = verify(
      token,
      process.env.SECRET_KEY || "yanggelapkaubukanindonesia",
    ) as unknown as AuthToken;

    const pembelianTiketHistory = await findManyPembelianTiketQuery({
      AND: [
        {
          pelanggan: {
            userId:
              decodedToken.role === "pelanggan" ? decodedToken.id : undefined,
          },
        },
        {
          createdAt: {
            gte: startDate ? gmtToWib(new Date(startDate)) : undefined,
            lte: endDate ? gmtToWib(new Date(endDate)) : undefined,
          },
        },
      ],
    });

    res.status(200).json({
      message: "Found pembelian tiket history!",
      data: pembelianTiketHistory.map((h) => {
        return {
          ...h,
          createdAt: gmtToWib(h.createdAt),
          updatedAt: gmtToWib(h.updatedAt),
        };
      }),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findPembelianTiketPemasukanController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { startDate, endDate } = req.body;

    const pembelianTiket = (await findManyPembelianTiketQuery(
      {
        AND: [
          {
            createdAt: {
              gte: startDate ? gmtToWib(new Date(startDate)) : undefined,
              lte: endDate ? gmtToWib(new Date(endDate)) : undefined,
            },
          },
        ],
      },
      { jadwal: true, detailPembelianTiket: true },
    )) as Prisma.PembelianTiketGetPayload<{
      include: { jadwal: true; detailPembelianTiket: true };
    }>[];

    const totalPemasukan = pembelianTiket
      .map((d) => d.jadwal.harga * d.detailPembelianTiket.length)
      .reduce((a, b) => a + b, 0);

    res.status(200).json({
      message: "Found pembelian tiket history!",
      data: {
        totalPemasukan,
        pembelianTiket,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};

export const findPembelianTiketNotaController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const pembelianTiket = (await findPembelianTiketQuery(
      {
        id,
      },
      {
        pelanggan: true,
        jadwal: { include: { kereta: true } },
        detailPembelianTiket: {
          include: { kursi: { include: { gerbong: true } } },
        },
      },
    )) as Prisma.PembelianTiketGetPayload<{
      include: {
        pelanggan: true;
        jadwal: { include: { kereta: true } };
        detailPembelianTiket: {
          include: { kursi: { include: { gerbong: true } } };
        };
      };
    }>;

    if (!pembelianTiket) {
      res
        .status(404)
        .json({ message: "Pembelian tiket not found!", data: null });
      return;
    }

    let formatedDetailPembelianTiket = "";
    const detailPembelianTiketGap =
      pembelianTiket.detailPembelianTiket.length * 15 * 4;
    const h = detailPembelianTiketGap + 24 * 18.5;

    pembelianTiket.detailPembelianTiket.forEach((d, i) => {
      formatedDetailPembelianTiket += `
- ${d.kursi.gerbong.namaGerbong} | No. kursi: ${d.kursi.noKursi} \n
  Nama penumpang: ${d.namaPenumpang} \n ${i === pembelianTiket.detailPembelianTiket.length - 1 ? "" : "\n"}`;
    });

    const canvas = createCanvas(512, h);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 512, h);

    const decorator = ` __  __   ______   ______   ______  ______  ______       ______   ______  __ \n
/\\ \\/ /  /\\  ___\\ /\\  == \\ /\\  ___\\/\\__  _\\/\\  __ \\     /\\  __ \\ /\\  == \\/\\ \\ \n
\\ \\  _"-.\\ \\  __\\ \\ \\  __< \\ \\  __\\\\/_/\\ \\/\\ \\  __ \\    \\ \\  __ \\\\ \\  _-/\\ \\ \\ \n
 \\ \\_\\ \\_\\\\ \\_____\\\\ \\_\\ \\_\\\\ \\_____\\ \\ \\_\\ \\ \\_\\ \\_\\    \\ \\_\\ \\_\\\\ \\_\\   \\ \\_\\ \n
  \\/_/\\/_/ \\/_____/ \\/_/ /_/ \\/_____/  \\/_/  \\/_/\\/_/     \\/_/\\/_/ \\/_/    \\/_/`;
    const f = `==================================================== \n
Nota Tiket Kerata API \n
==================================================== \n
ID                    : ${pembelianTiket.id} \n
Tanggal pembelian     : ${wibFormat(pembelianTiket.createdAt)} \n
Total harga           : ${rupiah(pembelianTiket.jadwal.harga * pembelianTiket.detailPembelianTiket.length)} \n
Nama pelanggan        : ${pembelianTiket.pelanggan.namaPenumpang} \n
==================================================== \n
Detail Pembelian Tiket \n
==================================================== \n
Nama kereta           : ${pembelianTiket.jadwal.kereta.namaKereta} | ${pembelianTiket.jadwal.kereta.kelas} \n
Jadwal keberangkatan  : ${wibFormat(wibToGmt(pembelianTiket.jadwal.tanggalKeberangkatan))} \n
Keberangkatan         : ${pembelianTiket.jadwal.asalKeberangkatan} - ${pembelianTiket.jadwal.tujuanKeberangkatan} \n
Jadwal kedatangan     : ${wibFormat(wibToGmt(pembelianTiket.jadwal.tanggalKedatangan))} \n
${formatedDetailPembelianTiket} \n
====================================================`;

    let dY = 8;
    const dL = 8;

    let fY = 90;
    const fL = 12;

    ctx.fillStyle = "#000000";
    ctx.font = "10.5px 'Geist Mono'";
    decorator.split("\n").forEach((deco) => {
      ctx.fillText(deco, 8, dY);
      dY += dL;
    });
    ctx.font = "16px 'Geist Mono'";
    f.split("\n").forEach((fmt) => {
      ctx.fillText(fmt, 8, fY);
      fY += fL;
    });

    res
      .setHeader("Content-Type", "image/jpeg")
      .send(await canvas.encode("jpeg", 100));
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong!", data: null });
  }
};
