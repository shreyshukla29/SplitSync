import prisma from '../config/prisma.client';
import { User } from '@prisma/client';

export const AuthRepository = {
  findUserByEmail: async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email } });
  },

  createUser: async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> => {
    return await prisma.user.create({ data });
  },

  findUserById: async (id: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id } });
  },
};
