import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createUserQuery = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({ data });
};

export const findUserQuery = async (where: Prisma.UserWhereUniqueInput) => {
  return await prisma.user.findUnique({ where });
};

export const findManyUserQuery = async () => {
  return await prisma.user.findMany();
};

export const updateUserQuery = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
) => {
  return await prisma.user.update({ where, data });
};

export const deleteUserQuery = async (where: Prisma.UserWhereUniqueInput) => {
  return await prisma.user.delete({ where });
};
