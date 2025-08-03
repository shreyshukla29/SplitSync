import { LoginPayload, SignupPayload, User } from './authTypes';
import axiosInstance from './../../utils/axiosinstance';



export const loginApi = async (data: LoginPayload): Promise<User> => {
  const res = await axiosInstance.post('/auth/login', data);
  return res.data;
};

export const signupApi = async (data: SignupPayload): Promise<User> => {
  const res = await axiosInstance.post('/auth/signup', data);
  return res.data;
};

export const logoutApi = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};
