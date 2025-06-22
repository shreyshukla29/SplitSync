import prisma from "../config/prisma.client";
import { Prisma, User } from "@prisma/client";
import { ConflictError } from "../utils/errors/ConflictError";
import { NotFoundError } from './../utils/errors/NotFoundError';

export const AuthRepository = {
  findUserByEmail: async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  },

  createUser: async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> => {
    try {
      return await prisma.user.create({
        data: {
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictError("Email already exists");
      }
      throw error;
    }
  },

  findUserById: async (id: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("User");
    return user;
  },
};
