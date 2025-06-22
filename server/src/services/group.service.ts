import { groupRepository } from '../repositories/group.repository';
import { User } from '@prisma/client';
import { NotFoundError } from './../utils/errors/NotFoundError';
import { ConflictError } from './../utils/errors/ConflictError';

export const groupService = {
  
  async createGroup(name: string) {
    const existing = await groupRepository.getGroupByName(name);
    if (existing) {
      throw new ConflictError('Group with this name already exists');
    }
    return groupRepository.createGroup(name);
  },

  
  async getGroupById(groupId: string) {
    const group = await groupRepository.getGroupById(groupId);
    if (!group) {
      throw new NotFoundError('Group');
    }
    return group;
  },

 
  async getGroupByName(name: string) {
    const group = await groupRepository.getGroupByName(name);
    if (!group) {
      throw new NotFoundError('Group');
    }
    return group;
  },

 
  async addUserToGroup(userId: string, groupId: string) {
    const group = await groupRepository.getGroupById(groupId);
    if (!group) {
      throw new NotFoundError('Group');
    }
    const alreadyMember = group.members.some((member:any) => member.userId === userId);
    if (alreadyMember) {
      throw new ConflictError('User is already a member of the group');
    }
    return groupRepository.addUserToGroup(userId, groupId);
  },

  async removeUserFromGroup(userId: string, groupId: string) {
    const group = await groupRepository.getGroupById(groupId);
    if (!group) {
      throw new NotFoundError('Group');
    }

    const userInGroup = group.members.find((member) => member.userId === userId);
    if (!userInGroup) {
      throw new NotFoundError('User is not in this group');
    }

    return groupRepository.removeUserFromGroup(userId, groupId);
  },

  
  async getGroupsByUserId(userId: string) {
    return groupRepository.getGroupsByUserId(userId);
  },
};
