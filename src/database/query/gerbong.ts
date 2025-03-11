import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createGerbongQuery = async (data: Prisma.GerbongCreateInput) => {
  return prisma.gerbong.create({ data });
};

export const findGerbongQuery = async (
  where: Prisma.GerbongWhereUniqueInput,
) => {
  return await prisma.gerbong.findUnique({ where });
};

export const findManyGerbongQuery = async () => {
  return await prisma.gerbong.findMany();
};

export const updateGerbongQuery = async (
  where: Prisma.GerbongWhereUniqueInput,
  data: Prisma.GerbongUpdateInput,
) => {
  return await prisma.gerbong.update({ where, data });
};

export const deleteGerbongQuery = async (
  where: Prisma.GerbongWhereUniqueInput,
) => {
  return await prisma.gerbong.delete({ where });
};
