import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createPelangganQuery = async (
  data: Prisma.PelangganCreateInput,
) => {
  return await prisma.pelanggan.create({ data });
};

export const findPelangganQuery = async (
  where: Prisma.PelangganWhereUniqueInput,
) => {
  return await prisma.pelanggan.findUnique({ where });
};

export const findManyPelangganQuery = async (
  where?: Prisma.PelangganWhereInput,
) => {
  return await prisma.pelanggan.findMany({ where });
};

export const updatePelangganQuery = async (
  where: Prisma.PelangganWhereUniqueInput,
  data: Prisma.PelangganUpdateInput,
) => {
  return await prisma.pelanggan.update({ where, data });
};

export const deletePelangganQuery = async (
  where: Prisma.PelangganWhereUniqueInput,
) => {
  return await prisma.pelanggan.delete({ where });
};
