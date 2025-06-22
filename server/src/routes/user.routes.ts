import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  getMe,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/user.controller";

const router = Router();

router.get("/me", authenticate, getMe);
router.put("/me", authenticate, updateProfile);
router.put("/me/password", authenticate, changePassword);
router.delete("/me", authenticate, deleteAccount);

export default router;
