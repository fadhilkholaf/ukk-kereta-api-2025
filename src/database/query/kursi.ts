import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createKursiQuery = async (data: Prisma.KursiCreateInput) => {
  return await prisma.kursi.create({ data });
};

export const findKursiQuery = async (where: Prisma.KursiWhereUniqueInput) => {
  return await prisma.kursi.findUnique({ where });
};

export const findManyKursiQuery = async (
  where?: Prisma.KursiWhereInput,
  include?: Prisma.KursiInclude,
) => {
  return await prisma.kursi.findMany({ where, include });
};

export const findManyKursiIdQuery = async (where: Prisma.KursiWhereInput) => {
  return await prisma.kursi.groupBy({
    by: "id",
    where,
  });
};

export const updateKursiQuery = async (
  where: Prisma.KursiWhereUniqueInput,
  data: Prisma.KursiUpdateInput,
) => {
  return await prisma.kursi.update({ where, data });
};

export const deleteKursiQuery = async (where: Prisma.KursiWhereUniqueInput) => {
  return await prisma.kursi.delete({ where });
};
