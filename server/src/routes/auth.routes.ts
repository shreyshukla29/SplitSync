import { Router } from "express";
import { register, login, logout, me } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", register);
router.post("/signin", login);
router.post("/signout", logout);
router.get("/me", authenticate, me);

export default router;
