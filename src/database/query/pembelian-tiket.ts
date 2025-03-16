import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createPembelianTiketQuery = async (
  data: Prisma.PembelianTiketCreateInput,
) => {
  return await prisma.pembelianTiket.create({ data });
};

export const findPembelianTiketQuery = async (
  where: Prisma.PembelianTiketWhereUniqueInput,
) => {
  return await prisma.pembelianTiket.findUnique({ where });
};

export const findManyPembelianTiketQuery = async () => {
  return await prisma.pembelianTiket.findMany();
};

export const updatePembelianTiketQuery = async (
  where: Prisma.PembelianTiketWhereUniqueInput,
  data: Prisma.PembelianTiketUpdateInput,
) => {
  return await prisma.pembelianTiket.update({ where, data });
};

export const deletePembelianTiketQuery = async (
  where: Prisma.PembelianTiketWhereUniqueInput,
) => {
  return await prisma.pembelianTiket.delete({ where });
};
