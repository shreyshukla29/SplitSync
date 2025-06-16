import { UserRepository } from "../repositories/user.repository";
import { hashPassword, comparePassword } from "../utils/hash.utils";
import { AppError } from "../utils/AppError";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "../validators/user.validator";

export const UserService = {
  getMe: async (userId: string) => {
    try {
      const user = await UserRepository.getById(userId.trim());
      if (!user) throw new AppError("User not found", 404);
      const { password, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      console.error("GetMe Error:", error);
      throw new AppError("Failed to fetch user", 500);
    }
  },

  updateProfile: async (
    userId: string,
    updates: { name?: string; email?: string; upi?: string }
  ) => {
    try {
      const parsed = updateProfileSchema.safeParse(updates);
      if (!parsed.success) {
        const msg = parsed.error.errors.map((e) => e.message).join(", ");
        throw new AppError(`Invalid profile update: ${msg}`, 400);
      }

      const user = await UserRepository.getById(userId.trim());
      if (!user) throw new AppError("User not found", 404);

      const updated = await UserRepository.updateById(userId.trim(), parsed.data);
      const { password, ...safeUser } = updated;
      return safeUser;
    } catch (error) {
      console.error("UpdateProfile Error:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to update profile", 500);
    }
  },

  changePassword: async (
    userId: string,
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      const parsed = changePasswordSchema.safeParse({ currentPassword, newPassword });
      if (!parsed.success) {
        const msg = parsed.error.errors.map((e) => e.message).join(", ");
        throw new AppError(`Password change validation failed: ${msg}`, 400);
      }

      const user = await UserRepository.getById(userId.trim());
      if (!user) throw new AppError("User not found", 404);

      const isMatch = await comparePassword(parsed.data.currentPassword, user.password);
      if (!isMatch) throw new AppError("Current password is incorrect", 400);

      const hashed = await hashPassword(parsed.data.newPassword);
      const updated = await UserRepository.changePassword(userId.trim(), hashed);

      const { password, ...safeUser } = updated;
      return safeUser;
    } catch (error) {
      console.error("ChangePassword Error:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to change password", 500);
    }
  },

  deleteAccount: async (userId: string) => {
    try {
      const user = await UserRepository.getById(userId.trim());
      if (!user) throw new AppError("User not found", 404);

      const deleted = await UserRepository.deleteUser(userId.trim());
      const { password, ...safeUser } = deleted;
      return safeUser;
    } catch (error) {
      console.error("DeleteAccount Error:", error);
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to delete account", 500);
    }
  },
};
