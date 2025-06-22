import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.getMe(req.user.id);
    res.status(201).json({success:true,message:"User found",user});
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.updateProfile(req.user.id, req.body);
    res.status(201).json({success:"true",message:"profile updated",user});
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await UserService.changePassword(req.user.id, currentPassword, newPassword);
    res.status(201).json({success:true, message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.deleteAccount(req.user.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
