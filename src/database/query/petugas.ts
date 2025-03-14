import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createPetugasQuery = async (data: Prisma.PetugasCreateInput) => {
  return await prisma.petugas.create({ data });
};

export const findPetugasQuery = async (
  where: Prisma.PetugasWhereUniqueInput,
) => {
  return await prisma.petugas.findUnique({ where });
};

export const findManyPetugasQuery = async () => {
  return await prisma.petugas.findMany();
};

export const updatePetugasQuery = async (
  where: Prisma.PetugasWhereUniqueInput,
  data: Prisma.PetugasUpdateInput,
) => {
  return await prisma.petugas.update({ where, data });
};

export const deletePetugasQuery = async (
  where: Prisma.PetugasWhereUniqueInput,
) => {
  return await prisma.petugas.delete({ where });
};
