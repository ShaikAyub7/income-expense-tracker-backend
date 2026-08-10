import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../lib/prisma";
import { ApiError } from "../errors/ApiError";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const createCategory = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  // #swagger.tags = ['Categories']
  const { name, description } = req.body;
  const userId = req.user?.userId;

  if (!name || !description) {
    throw new ApiError(
      "Please provide name and description",
      StatusCodes.BAD_REQUEST,
    );
  }

  if (!userId) {
    throw new ApiError("User not found", StatusCodes.NOT_FOUND);
  }

  const category = await prisma.category.create({
    data: {
      name,
      description,
      userId,
    },
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Category created successfully",
    category,
  });
};

export const getCategories = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  // #swagger.tags = ['Categories']

  const userId = req.user?.userId;

  if (!userId) {
    throw new ApiError("User not found", StatusCodes.NOT_FOUND);
  }

  const Categories = await prisma.category.findMany({
    where: {
      userId: userId,
    },
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });

  const result = Categories.map((category) => ({
    ...category,
    totalTransactions: (category as any)?._count?.transactions ?? 0,
  }));
  res.status(StatusCodes.OK).json({
    success: true,
    message: "categories fetched successfully",
    result,
  });
};
