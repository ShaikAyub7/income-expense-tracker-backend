import { ApiError } from "./ApiError.js";

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}
