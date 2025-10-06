import { apiService } from './api';
import { Transaction, ApiResponse, PaginatedResponse } from '../types';

export interface CreatePaymentData {
  amount: number;
  toUserId: string;
  groupId?: string;
  description?: string;
}

export interface TransactionFilters {
  type?: 'expense' | 'payment' | 'settlement';
  groupId?: string;
  status?: 'pending' | 'completed' | 'failed';
  startDate?: string;
  endDate?: string;
}

export class TransactionService {
  async getTransactions(
    filters: TransactionFilters = {},
    page = 1,
    limit = 20
  ): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    return apiService.get(`/transactions?${params.toString()}`);
  }

  async getTransaction(id: string): Promise<ApiResponse<Transaction>> {
    return apiService.get(`/transactions/${id}`);
  }

  async createPayment(data: CreatePaymentData): Promise<ApiResponse<Transaction>> {
    return apiService.post('/transactions/payment', data);
  }

  async settleBalance(userId: string, amount: number, groupId?: string): Promise<ApiResponse<Transaction>> {
    return apiService.post('/transactions/settle', {
      userId,
      amount,
      groupId,
    });
  }

  async markPaymentComplete(transactionId: string): Promise<ApiResponse<Transaction>> {
    return apiService.put(`/transactions/${transactionId}/complete`);
  }

  async cancelTransaction(transactionId: string): Promise<ApiResponse<Transaction>> {
    return apiService.put(`/transactions/${transactionId}/cancel`);
  }
}

export const transactionService = new TransactionService();