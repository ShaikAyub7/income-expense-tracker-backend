import { ApiError } from "./ApiError.js";

export class NotFoundError extends ApiError {
  constructor(message = "NotFound") {
    super(message, 404);
  }
}
