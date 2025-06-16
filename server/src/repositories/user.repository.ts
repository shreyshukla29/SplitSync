import prisma from "../config/prisma.client";
import { Prisma, User } from "@prisma/client";

export const UserRepository = {
  getById: async (id: string): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({
        where: { id: id.trim() },
      });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Failed to fetch user");
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
        throw new Error("User not found for update");
      }

      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
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
        throw new Error("User not found for password update");
      }

      console.error("Error changing password:", error);
      throw new Error("Failed to change password");
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
        throw new Error("User not found for deletion");
      }

      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  },
};
