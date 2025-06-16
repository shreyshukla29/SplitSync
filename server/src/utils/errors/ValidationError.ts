import { AppError } from '../AppError';
export class ValidationError extends AppError {
  constructor(message: string = 'Invalid input') {
    super(message, 400);
  }
}
