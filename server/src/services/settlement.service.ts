import { z } from "zod";
import { SettlementRepository } from "../repositories/settlement.repository";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { NotFoundError } from "../utils/errors/NotFoundError";

const settleSchema = z.string().uuid("Invalid group ID");

export const SettlementService = {
  settleGroup: async (groupId: string, userId: string) => {
    const parsed = settleSchema.safeParse(groupId);
    if (!parsed.success) throw new BadRequestError("Invalid Group ID");

    const groupExists = await SettlementRepository.checkGroupExists(groupId);
    if (!groupExists) throw new NotFoundError("Group");

    // Actual logic delegated to repository
    return await SettlementRepository.createSettlementsFromBalances(groupId, userId);
  },

  getGroupSettlements: async (groupId: string) => {
    const parsed = settleSchema.safeParse(groupId);
    if (!parsed.success) throw new BadRequestError("Invalid Group ID");

    return await SettlementRepository.fetchSettlements(groupId);
  },
};
