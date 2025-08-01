import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createSettlement, getGroupSettlements } from "../controllers/settlement.controller";

const router = Router();

router.post("/", authenticate, createSettlement);
router.get("/group/:groupId", authenticate, getGroupSettlements);

export default router;
