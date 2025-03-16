import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createUserQuery = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({ data });
};

export const findUserQuery = async (
  where: Prisma.UserWhereUniqueInput,
  include?: Prisma.UserInclude,
) => {
  return await prisma.user.findUnique({ where, include });
};

export const findManyUserQuery = async (where?: Prisma.UserWhereInput) => {
  return await prisma.user.findMany({ where });
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
