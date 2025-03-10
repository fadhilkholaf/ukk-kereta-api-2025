import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createKereta = async (data: Prisma.KeretaCreateInput) => {
  return prisma.kereta.create({ data });
};

export const findKereta = async (where: Prisma.KeretaWhereUniqueInput) => {
  return await prisma.kereta.findUnique({ where });
};

export const updateKereta = async (
  where: Prisma.KeretaWhereUniqueInput,
  data: Prisma.KeretaUpdateInput
) => {
  return await prisma.kereta.update({ where, data });
};

export const deleteKereta = async (where: Prisma.KeretaWhereUniqueInput) => {
  return await prisma.kereta.delete({ where });
};
