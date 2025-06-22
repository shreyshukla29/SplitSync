import prisma from "../config/prisma.client";
import { Prisma, User } from "@prisma/client";
import { AppError } from "../utils/AppError";
import { NotFoundError } from './../utils/errors/NotFoundError';

export const UserRepository = {
  getById: async (id: string): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({
        where: { id: id.trim() },
      });
    } catch (error) {
      console.error("UserRepository.getById Error:", error);
      throw new AppError("Failed to fetch user", 500);
    }
  },

  updateById: async (
    id: string,
    data: Partial<Omit<User, "id" | "password" | "createdAt" | "updatedAt">>
  ): Promise<User> => {
    try {
      return await prisma.user.update({
        where: { id: id.trim() },
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("User for update");
      }

      console.error("UserRepository.updateById Error:", error);
      throw new AppError("Failed to update user", 500);
    }
  },

  changePassword: async (id: string, hashedPassword: string): Promise<User> => {
    try {
      return await prisma.user.update({
        where: { id: id.trim() },
        data: { password: hashedPassword },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("User for password update");
      }

      console.error("UserRepository.changePassword Error:", error);
      throw new AppError("Failed to change password", 500);
    }
  },

  deleteUser: async (id: string): Promise<User> => {
    try {
      return await prisma.user.delete({
        where: { id: id.trim() },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("User for deletion");
      }

      console.error("UserRepository.deleteUser Error:", error);
      throw new AppError("Failed to delete user", 500);
    }
  },
};
