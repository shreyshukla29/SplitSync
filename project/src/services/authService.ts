import { apiService } from './api';
import { User, LoginCredentials, SignupData, ApiResponse } from '../types';

export class AuthService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    return apiService.post('/signin', credentials);
  }

  async signup(data: SignupData): Promise<ApiResponse<{ user: User; token: string }>> {
    return apiService.post('/signup', data);
  }

  async logout(): Promise<ApiResponse<null>> {
    return apiService.post('/signout');
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return apiService.post('/auth/refresh');
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiService.get('me');
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiService.put('/me', data);
  }

  async uploadProfilePicture(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('profilePicture', file);
    return apiService.upload('/me', formData);
  }
}

export const authService = new AuthService();