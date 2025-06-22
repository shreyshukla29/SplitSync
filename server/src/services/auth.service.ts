import bcrypt from "bcrypt";
import { AuthRepository } from "../repositories/auth.repository";
import { generateToken } from "../utils/jwt.utils";
import { z } from "zod";

import { NotFoundError } from "./../utils/errors/NotFoundError";
import { AppError } from "./../utils/AppError";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { AlreadyExistsError } from "./../utils/errors/AlreadyExisitingError";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").max(100),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "At least one uppercase letter required")
    .regex(/[a-z]/, "At least one lowercase letter required")
    .regex(/[0-9]/, "At least one digit required")
    .regex(/[^A-Za-z0-9]/, "At least one special character required"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address").max(100),
  password: z.string().min(1, "Password is required"),
});

export const AuthService = {
  register: async (name: string, email: string, password: string) => {
    try {
      const parsed = registerSchema.safeParse({ name, email, password });
      if (!parsed.success) {
        const message = parsed.error.errors.map((e) => e.message).join(", ");
        throw new BadRequestError(message);
      }

      const normalizedEmail = email.trim().toLowerCase();
      const existingUser = await AuthRepository.findUserByEmail(
        normalizedEmail
      );
      if (existingUser) throw new AlreadyExistsError("Email");

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await AuthRepository.createUser({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
      });

      return {
        token: generateToken({ id: user.id }),
        user: { id: user.id, name: user.name, email: user.email },
      };
    } catch (error: any) {
      console.error("Register Error:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Unexpected registration error", 500);
    }
  },

  login: async (email: string, password: string) => {
    try {
      const parsed = loginSchema.safeParse({ email, password });
      if (!parsed.success) {
        const message = parsed.error.errors.map((e) => e.message).join(", ");
        throw new BadRequestError(message);
      }

      const normalizedEmail = email.trim().toLowerCase();
      const user = await AuthRepository.findUserByEmail(normalizedEmail);
      if (!user) throw new NotFoundError("Invalid email or password");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new BadRequestError("Invalid  password");
      return {
        token: generateToken({ id: user.id }),
        user: { id: user.id, name: user.name, email: user.email },
      };
    } catch (error: any) {
      console.error("Login Error:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Unexpected login error", 500);
    }
  },

  getCurrentUser: async (userId: string) => {
    try {
      if (!userId || typeof userId !== "string") {
        throw new BadRequestError("Invalid user ID");
      }
      const user = await AuthRepository.findUserById(userId);
      if (!user) {
        throw new NotFoundError("User");
      }
      return { id: user.id, name: user.name, email: user.email };
    } catch (error: any) {
      console.error("Get Current User Error:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Error fetching user", 500);
    }
  },
};
