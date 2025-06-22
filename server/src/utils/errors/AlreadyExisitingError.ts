import { AppError } from "../AppError";

export class AlreadyExistsError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} already exists`, 409);
  }
}
