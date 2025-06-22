import prisma from '../config/prisma.client';
import { Group, GroupMember, Prisma } from '@prisma/client';
import {  AppError } from '../utils/AppError';
import { ConflictError } from './../utils/errors/ConflictError';
import { NotFoundError } from './../utils/errors/NotFoundError';

type FullGroup = Prisma.GroupGetPayload<{
  include: {
    members: { include: { user: true } },
    expenses: true,
    settlements: true
  }
}>;

export const groupRepository = {
  async createGroup(name: string): Promise<Group> {
    try {
      return await prisma.group.create({ data: { name: name.trim() } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictError('Group name already exists');
      }
      throw new AppError('Failed to create group', 500);
    }
  },

  async getGroupById(id: string): Promise<FullGroup | null> {
    try {
      return await prisma.group.findUnique({
        where: { id: id.trim() },
        include: {
          members: { include: { user: true } },
          expenses: true,
          settlements: true,
        },
      });
    } catch (error) {
      throw new AppError('Failed to fetch group', 500);
    }
  },

  async getGroupByName(name: string): Promise<Group | null> {
    try {
      return await prisma.group.findFirst({
        where: { name: name.trim() },
      });
    } catch (error) {
      throw new AppError('Failed to fetch group by name', 500);
    }
  },

  async addUserToGroup(userId: string, groupId: string): Promise<GroupMember> {
    try {
      return await prisma.groupMember.create({
        data: {
          userId: userId.trim(),
          groupId: groupId.trim(),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictError('User already added to the group');
      }
      throw new AppError('Failed to add user to group', 500);
    }
  },

  async removeUserFromGroup(userId: string, groupId: string): Promise<GroupMember> {
    try {
      return await prisma.groupMember.delete({
        where: {
          userId_groupId: {
            userId: userId.trim(),
            groupId: groupId.trim(),
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundError('User not found in group');
      }
      throw new AppError('Failed to remove user from group', 500);
    }
  },

  async getGroupsByUserId(userId: string): Promise<FullGroup[]> {
    try {
      return await prisma.group.findMany({
        where: {
          members: {
            some: {
              userId: userId.trim(),
            },
          },
        },
        include: {
          members: { include: { user: true } },
          expenses: true,
          settlements: true,
        },
      });
    } catch (error) {
      throw new AppError('Failed to fetch groups for user', 500);
    }
  },
};
