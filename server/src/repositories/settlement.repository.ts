import prisma from "../config/prisma.client";
import { Prisma } from "@prisma/client";

export const SettlementRepository = {
  checkGroupExists: async (groupId: string) => {
    const group = await prisma.group.findUnique({ where: { id: groupId } });
    return !!group;
  },

  fetchSettlements: async (groupId: string) => {
    return prisma.settlement.findMany({
      where: { groupId },
      include: {
        from: { select: { id: true, name: true } },
        to: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  createSettlementsFromBalances: async (groupId: string, settledBy: string) => {
    return await prisma.$transaction(async (tx) => {
      const balances = await tx.groupBalance.findMany({ where: { groupId } });

      const positive: { userId: string; amount: number }[] = [];
      const negative: { userId: string; amount: number }[] = [];

      for (const b of balances) {
        if (b.balance > 0) positive.push({ userId: b.userId, amount: b.balance });
        else if (b.balance < 0) negative.push({ userId: b.userId, amount: -b.balance });
      }

      const settlements: Prisma.SettlementCreateManyInput[] = [];

      let i = 0, j = 0;
      while (i < positive.length && j < negative.length) {
        const payer = negative[j];
        const receiver = positive[i];
        const amount = Math.min(payer.amount, receiver.amount);

        settlements.push({
          groupId,
          fromUserId: payer.userId,
          toUserId: receiver.userId,
          amount,
          settledByUserId: settledBy,
        });

        payer.amount -= amount;
        receiver.amount -= amount;

        if (payer.amount === 0) j++;
        if (receiver.amount === 0) i++;
      }

      if (settlements.length === 0) throw new Error("No outstanding balances to settle");

      await tx.settlement.createMany({ data: settlements });

      // Reset group balances
      await tx.groupBalance.updateMany({
        where: { groupId },
        data: { balance: 0 },
      });

      return settlements;
    });
  },
};
