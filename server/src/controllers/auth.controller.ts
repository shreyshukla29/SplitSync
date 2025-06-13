import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await AuthService.register(name, email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15, // 15 mins
    });

    res.status(201).json({ message: 'Registration successful', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15,
    });

    res.status(200).json({ message: 'Login successful', user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

export const me = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const user = await AuthService.getCurrentUser(userId);
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
