import { AppError } from '../AppError';
export class InternalError extends AppError {
  constructor(message: string = 'Something went wrong') {
    super(message, 500);
  }
}