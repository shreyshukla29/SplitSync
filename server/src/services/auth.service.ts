import bcrypt from "bcrypt";
import { AuthRepository } from "../repositories/auth.repository";
import { generateToken } from "../utils/jwt.utils";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").max(100),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password too long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
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
        const message = parsed.error.errors.map(e => e.message).join(", ");
        throw new Error(`Validation failed: ${message}`);
      }

      const normalizedEmail = email.trim().toLowerCase();

      const existingUser = await AuthRepository.findUserByEmail(normalizedEmail);
      if (existingUser) {
        throw new Error("Email already in use");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await AuthRepository.createUser({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
      });

      return {
        token: generateToken({ userId: user.id }),
        user: { id: user.id, name: user.name, email: user.email },
      };
    } catch (error) {
      console.error("Register Error:", error);
      throw new Error(error instanceof Error ? error.message : "Registration failed");
    }
  },

  login: async (email: string, password: string) => {
    try {
      const parsed = loginSchema.safeParse({ email, password });
      if (!parsed.success) {
        const message = parsed.error.errors.map(e => e.message).join(", ");
        throw new Error(`Validation failed: ${message}`);
      }

      const normalizedEmail = email.trim().toLowerCase();

      const user = await AuthRepository.findUserByEmail(normalizedEmail);
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      return {
        token: generateToken({ userId: user.id }),
        user: { id: user.id, name: user.name, email: user.email },
      };
    } catch (error) {
      console.error("Login Error:", error);
      throw new Error(error instanceof Error ? error.message : "Login failed");
    }
  },

  getCurrentUser: async (userId: string) => {
    try {
      if (!userId || typeof userId !== "string") {
        throw new Error("Invalid user ID");
      }

      const user = await AuthRepository.findUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      return { id: user.id, name: user.name, email: user.email };
    } catch (error) {
      console.error("Get Current User Error:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to fetch user");
    }
  },
};
