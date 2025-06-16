import { AppError } from '../AppError';
export class AuthorizationError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}