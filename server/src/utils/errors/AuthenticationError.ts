import { AppError } from '../AppError';
export class AuthenticationError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}