import bcrypt from "bcrypt";
import { AuthRepository } from "../repositories/auth.repository";
import { generateToken } from "../utils/jwt.utils";

export const AuthService = {
  register: async (name: string, email: string, password: string) => {
    const existingUser = await AuthRepository.findUserByEmail(email);
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await AuthRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return { token: generateToken({ userId: user.id }), user };
  },

  login: async (email: string, password: string) => {
    const user = await AuthRepository.findUserByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    return { token: generateToken({ userId: user.id }), user };
  },

  getCurrentUser: async (userId: string) => {
    const user = await AuthRepository.findUserById(userId);
    if (!user) throw new Error("User not found");
    return user;
  },
};
