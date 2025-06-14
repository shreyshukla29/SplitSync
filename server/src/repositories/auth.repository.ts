import prisma from "../config/prisma.client";
import { Prisma, User } from "@prisma/client";

export const AuthRepository = {
  findUserByEmail: async (email: string): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({
        where: { email: email.trim().toLowerCase() },
      });
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("Database error while fetching user by email");
    }
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          // Unique constraint failed (email already exists)
          throw new Error("Email already exists");
        }
      }

      console.error("Error creating user:", error);
      throw new Error("Database error while creating user");
    }
  },

  findUserById: async (id: string): Promise<User | null> => {
    try {
      return await prisma.user.findUnique({ where: { id } });
    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw new Error("Database error while fetching user by ID");
    }
  },
};
