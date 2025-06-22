import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await AuthService.register(name, email, password);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 3600,
    });

    res.status(201).json({ message: "Registration successful", user, success: true });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 3600,
    });

    res.status(200).json({ message: "Login successful", user, success: true });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logged out successfully", success: true });
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const user = await AuthService.getCurrentUser(userId);
    res.status(200).json({ message: "User details fetched", user, success: true });
  } catch (error) {
    next(error);
  }
};
