import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { verifyJwt } from "../utils";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Invalid credentials");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyJwt(token);
    req.user = decoded;

    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid or expired token");
  }
};
