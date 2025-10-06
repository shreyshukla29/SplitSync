import { apiService } from './api';
import { Group, Balance, ApiResponse, PaginatedResponse } from '../types';

export class GroupService {
  async getGroups(): Promise<ApiResponse<Group[]>> {
    return apiService.get('/groups');
  }

  async getGroup(id: string): Promise<ApiResponse<Group>> {
    return apiService.get(`/groups/${id}`);
  }

  async createGroup(data: { name: string; description?: string }): Promise<ApiResponse<Group>> {
    return apiService.post('/groups', data);
  }

  async updateGroup(id: string, data: Partial<Group>): Promise<ApiResponse<Group>> {
    return apiService.put(`/groups/${id}`, data);
  }

  async deleteGroup(id: string): Promise<ApiResponse<null>> {
    return apiService.delete(`/groups/${id}`);
  }

  async addMember(groupId: string, email: string): Promise<ApiResponse<Group>> {
    return apiService.post(`/groups/${groupId}/members`, { email });
  }

  async removeMember(groupId: string, userId: string): Promise<ApiResponse<Group>> {
    return apiService.delete(`/groups/${groupId}/members/${userId}`);
  }

  async getGroupBalances(groupId: string): Promise<ApiResponse<Balance[]>> {
    return apiService.get(`/groups/${groupId}/balances`);
  }

  async getUserBalances(): Promise<ApiResponse<Balance[]>> {
    return apiService.get('/groups/balances');
  }
}

export const groupService = new GroupService();