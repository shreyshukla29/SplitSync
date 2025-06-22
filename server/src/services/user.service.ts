import { UserRepository } from "../repositories/user.repository";
import { hashPassword, comparePassword } from "../utils/hash.utils";
import {AppError} from "../utils/AppError";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "../validators/user.validator";
import { NotFoundError } from './../utils/errors/NotFoundError';
import { BadRequestError } from './../utils/errors/BadRequestError';


export const UserService = {
  getMe: async (userId: string) => {
    if (!userId || typeof userId !== "string") {
      throw new BadRequestError("Invalid user ID");
    }

    const user = await UserRepository.getById(userId.trim());
    if (!user) throw new NotFoundError("User");

    const { password, ...safeUser } = user;
    return safeUser;
  },

  updateProfile: async (
    userId: string,
    updates: { name?: string; email?: string; upi?: string }
  ) => {
    const parsed = updateProfileSchema.safeParse(updates);
    if (!parsed.success) {
      const msg = parsed.error.errors.map((e) => e.message).join(", ");
      throw new BadRequestError(`Invalid profile update: ${msg}`);
    }

    const user = await UserRepository.getById(userId.trim());
    if (!user) throw new NotFoundError("User");

    try {
      const updated = await UserRepository.updateById(userId.trim(), parsed.data);
      const { password, ...safeUser } = updated;
      return safeUser;
    } catch (err) {
      console.error("UpdateProfile Error:", err);
      throw new AppError("Failed to update profile", 500);
    }
  },

  changePassword: async (
    userId: string,
    currentPassword: string,
    newPassword: string
  ) => {
    const parsed = changePasswordSchema.safeParse({
      currentPassword,
      newPassword,
    });
    if (!parsed.success) {
      const msg = parsed.error.errors.map((e) => e.message).join(", ");
      throw new BadRequestError(`Password change failed: ${msg}`);
    }

    const user = await UserRepository.getById(userId.trim());
    if (!user) throw new NotFoundError("User");

    const isMatch = await comparePassword(
      parsed.data.currentPassword,
      user.password
    );
    if (!isMatch) throw new BadRequestError("Current password is incorrect");

    try {
      const hashed = await hashPassword(parsed.data.newPassword);
      const updated = await UserRepository.changePassword(userId.trim(), hashed);
      const { password, ...safeUser } = updated;
      return safeUser;
    } catch (err) {
      console.error("ChangePassword Error:", err);
      throw new AppError("Failed to change password", 500);
    }
  },

  deleteAccount: async (userId: string) => {
    const user = await UserRepository.getById(userId.trim());
    if (!user) throw new NotFoundError("User");

    try {
      const deleted = await UserRepository.deleteUser(userId.trim());
      const { password, ...safeUser } = deleted;
      return safeUser;
    } catch (err) {
      console.error("DeleteAccount Error:", err);
      throw new AppError("Failed to delete account", 500);
    }
  },
};
