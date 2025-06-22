import prisma from '../config/prisma.client';
import { Group, GroupMember, Prisma } from '@prisma/client';

type FullGroup = Prisma.GroupGetPayload<{
  include: {
    members: { include: { user: true } },
    expenses: true,
    settlements: true
  }
}>;

export const groupRepository = {
  async createGroup(name: string): Promise<Group> {
    return prisma.group.create({
      data: { name },
    });
  },

  async getGroupById(id: string): Promise<FullGroup | null> {
    return prisma.group.findUnique({
      where: { id },
      include: {
        members: {
          include: { user: true },
        },
        expenses: true,
        settlements: true,
      },
    });
  },

  async getGroupByName(name: string): Promise<Group | null> {
    return prisma.group.findFirst({
      where: { name },
    });
  },

  async addUserToGroup(userId: string, groupId: string): Promise<GroupMember> {
    return prisma.groupMember.create({
      data: {
        userId,
        groupId,
      },
    });
  },

  async removeUserFromGroup(userId: string, groupId: string): Promise<GroupMember> {
    return prisma.groupMember.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });
  },

  async getGroupsByUserId(userId: string): Promise<FullGroup[]> {
    return prisma.group.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: {
          include: { user: true },
        },
        expenses: true,
        settlements: true,
      },
    });
  },
};
