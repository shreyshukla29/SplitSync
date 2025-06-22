import { Request, Response, NextFunction } from 'express';
import { groupService } from '../services/group.service';

export const groupController = {
  async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const group = await groupService.createGroup(name);
      res.status(201).json({ success: true, group });
    } catch (err) {
      next(err);
    }
  },

  async getGroupById(req: Request, res: Response, next: NextFunction) {
    try {
      const { groupId } = req.params;
      const group = await groupService.getGroupById(groupId);
      res.status(200).json({ success: true, group });
    } catch (err) {
      next(err);
    }
  },

  async getGroupByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;
      const group = await groupService.getGroupByName(String(name));
      res.status(200).json({ success: true, group });
    } catch (err) {
      next(err);
    }
  },

  async addUserToGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { groupId } = req.params;
      const { userId } = req.body;
      const member = await groupService.addUserToGroup(userId, groupId);
      res.status(200).json({ success: true, member });
    } catch (err) {
      next(err);
    }
  },

  async removeUserFromGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { groupId, userId } = req.params;
      const removed = await groupService.removeUserFromGroup(userId, groupId);
      res.status(200).json({ success: true, removed });
    } catch (err) {
      next(err);
    }
  },

  async getGroupsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const groups = await groupService.getGroupsByUserId(userId);
      res.status(200).json({ success: true, groups });
    } catch (err) {
      next(err);
    }
  },
};
