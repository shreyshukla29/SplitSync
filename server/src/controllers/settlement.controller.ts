import { Request, Response, NextFunction } from "express";
import { SettlementService } from "../services/settlement.service";

export const createSettlement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { groupId, fromUserId, toUserId, amount } = req.body;
    const settlement = await SettlementService.createSettlement({ groupId, fromUserId, toUserId, amount });
    res.status(201).json({ message: "Settlement recorded", settlement, success: true });
  } catch (error) {
    next(error);
  }
};

export const getGroupSettlements = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { groupId } = req.params;
    const settlements = await SettlementService.getSettlementsByGroup(groupId);
    res.status(200).json({ message: "Settlements fetched", settlements, success: true });
  } catch (error) {
    next(error);
  }
};
