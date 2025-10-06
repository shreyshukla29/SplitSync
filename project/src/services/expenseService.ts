import { apiService } from './api';
import { Expense, ExpenseNote, ExpenseComment, ApiResponse, PaginatedResponse } from '../types';

export interface CreateExpenseData {
  title: string;
  description?: string;
  amount: number;
  groupId: string;
  paidBy: string;
  splitType: 'equal' | 'custom' | 'percentage';
  splits: Array<{
    userId: string;
    amount?: number;
    percentage?: number;
  }>;
  category?: string;
  date?: string;
}

export class ExpenseService {
  async getExpenses(groupId?: string, page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<Expense>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (groupId) {
      params.append('groupId', groupId);
    }

    return apiService.get(`/expenses?${params.toString()}`);
  }

  async getExpense(id: string): Promise<ApiResponse<Expense>> {
    return apiService.get(`/expenses/${id}`);
  }

  async createExpense(data: CreateExpenseData): Promise<ApiResponse<Expense>> {
    return apiService.post('/expenses', data);
  }

  async updateExpense(id: string, data: Partial<CreateExpenseData>): Promise<ApiResponse<Expense>> {
    return apiService.put(`/expenses/${id}`, data);
  }

  async deleteExpense(id: string): Promise<ApiResponse<null>> {
    return apiService.delete(`/expenses/${id}`);
  }

  // Notes
  async getExpenseNote(expenseId: string): Promise<ApiResponse<ExpenseNote | null>> {
    return apiService.get(`/expenses/${expenseId}/note`);
  }

  async createExpenseNote(expenseId: string, content: string): Promise<ApiResponse<ExpenseNote>> {
    return apiService.post(`/expenses/${expenseId}/note`, { content });
  }

  async updateExpenseNote(expenseId: string, content: string): Promise<ApiResponse<ExpenseNote>> {
    return apiService.put(`/expenses/${expenseId}/note`, { content });
  }

  async deleteExpenseNote(expenseId: string): Promise<ApiResponse<null>> {
    return apiService.delete(`/expenses/${expenseId}/note`);
  }

  // Comments
  async getExpenseComments(expenseId: string): Promise<ApiResponse<ExpenseComment[]>> {
    return apiService.get(`/expenses/${expenseId}/comments`);
  }

  async createExpenseComment(expenseId: string, message: string): Promise<ApiResponse<ExpenseComment>> {
    return apiService.post(`/expenses/${expenseId}/comments`, { message });
  }

  async updateExpenseComment(commentId: string, message: string): Promise<ApiResponse<ExpenseComment>> {
    return apiService.put(`/expenses/comments/${commentId}`, { message });
  }

  async deleteExpenseComment(commentId: string): Promise<ApiResponse<null>> {
    return apiService.delete(`/expenses/comments/${commentId}`);
  }
}

export const expenseService = new ExpenseService();