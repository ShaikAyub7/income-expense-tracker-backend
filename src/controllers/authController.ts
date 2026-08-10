import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../errors/ApiError";
import { createJwt } from "../utils";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
      // #swagger.tags = ['Authentication']

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(
      "Please provide name, email and password",
      StatusCodes.BAD_REQUEST,
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(
      "User already exists",
      StatusCodes.BAD_REQUEST,
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10); 

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const accessToken = createJwt({
    userId: user.id,
    email: user.email,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
  });
};




export const login = async (req: Request, res: Response) => {
        // #swagger.tags = ['Authentication']

  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(
      "Please provide email and password",
      StatusCodes.BAD_REQUEST,
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(
      "User not found",
      StatusCodes.NOT_FOUND,
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(
      "Invalid credentials",
      StatusCodes.UNAUTHORIZED,
    );
  }

  const accessToken = createJwt({
    userId: user.id,
    email: user.email,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
  });
};