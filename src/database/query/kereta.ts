import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createKeretaQuery = async (data: Prisma.KeretaCreateInput) => {
  return prisma.kereta.create({ data });
};

export const findKeretaQuery = async (where: Prisma.KeretaWhereUniqueInput) => {
  return await prisma.kereta.findUnique({ where });
};

export const updateKeretaQuery = async (
  where: Prisma.KeretaWhereUniqueInput,
  data: Prisma.KeretaUpdateInput
) => {
  return await prisma.kereta.update({ where, data });
};

export const deleteKeretaQuery = async (where: Prisma.KeretaWhereUniqueInput) => {
  return await prisma.kereta.delete({ where });
};
