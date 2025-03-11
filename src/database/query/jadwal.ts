import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createJadwalQuery = async (data: Prisma.JadwalCreateInput) => {
  return await prisma.jadwal.create({ data });
};

export const findJadwalQuery = async (where: Prisma.JadwalWhereUniqueInput) => {
  return await prisma.jadwal.findUnique({ where });
};

export const findManyJadwalQuery = async () => {
  return await prisma.jadwal.findMany();
};

export const updateJadwalQuery = async (
  where: Prisma.JadwalWhereUniqueInput,
  data: Prisma.JadwalUpdateInput,
) => {
  return await prisma.jadwal.update({ where, data });
};

export const deleteJadwalQuery = async (
  where: Prisma.JadwalWhereUniqueInput,
) => {
  return await prisma.jadwal.delete({ where });
};
