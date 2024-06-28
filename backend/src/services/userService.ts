import prisma from '../utils/prismaClient';

export const getUserProfile = (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true },
  });
};

export const updateUserProfile = (userId: number, name: string, email: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { name, email },
    select: { id: true, name: true, email: true },
  });
};