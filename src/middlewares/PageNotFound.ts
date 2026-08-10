import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export const pageNotFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found [${req.originalUrl}]`,
  });
}; 