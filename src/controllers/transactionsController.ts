import { StatusCodes } from "http-status-codes";
import { ApiError } from "../errors/ApiError";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createTransaction = async (req: Request, res: Response) => {
  // #swagger.tags = ['Transactions']

  const {name, amount, type, description, paymentMethod, categoryId ,date} = req.body;

  const userId = req.user?.userId;
    if (!amount || !type || !description||!paymentMethod||!categoryId) {
    throw new ApiError(
        "Please provide amount, type and description,paymentMethod,categoryId",
        StatusCodes.BAD_REQUEST,
    );
    }

if (!userId) {
    throw new ApiError(
        "User not found",
        StatusCodes.NOT_FOUND,
    );
}

    const transaction = await prisma.transaction.create({
     data: {
    amount,
    type,
    description,
    userId: userId,
    name,
    date,
    paymentMethod,
    categoryId,
  },
    include: {
    category: true,
  },
});

  res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Transaction created successfully",
        transaction
    });
}


export const getTransactions = async (
  req: Request,
  res: Response
) => {

  // #swagger.tags = ['Transactions']
  const userId = req.user?.userId;

  if (!userId) {
    throw new ApiError(
      "User not authenticated",
      StatusCodes.UNAUTHORIZED
    );
  }

  const {
    type,
    categoryId,
    paymentMethod,
    search,
    startDate,
    endDate,
    date,
    minAmount,
    maxAmount,
  } = req.query;

  const where: any = {
    userId,
  };

  if (type) {
    where.type = String(type);
  }

  if (categoryId) {
    where.categoryId = String(categoryId);
  }

  
  if (paymentMethod) {
    where.paymentMethod = String(paymentMethod);
  }

  if (date) {
    where.date = String(date);
  }

  if (search) {
    where.name = {
      contains: String(search),
      mode: "insensitive",
    };
  }

 
  if (startDate || endDate) {
    where.createdAt = {};

    if (startDate) {
      where.createdAt.gte = new Date(String(startDate));
    }

    if (endDate) {
      where.createdAt.lte = new Date(String(endDate));
    }
  }

  if (minAmount || maxAmount) {
    where.amount = {};

    if (minAmount) {
      where.amount.gte = Number(minAmount);
    }

    if (maxAmount) {
      where.amount.lte = Number(maxAmount);
    }
  }

  const transactions = await prisma.transaction.findMany({
    where,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Transactions fetched successfully",
    transactions,
  });
};


export const getTransactionById = async (req: Request, res: Response) => {
  // #swagger.tags = ['Transactions']
const id = String(req.params.id);
  const userId = req.user?.userId;

  if (!userId) {
    throw new ApiError(
      "User not authenticated",
      StatusCodes.UNAUTHORIZED
    );
  }

  if (!id) {
    throw new ApiError(
      "Transaction id is required",
      StatusCodes.BAD_REQUEST
    );
  }

  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  if (!transaction) {
    throw new ApiError(
      "Transaction not found",
      StatusCodes.NOT_FOUND
    );
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Transaction fetched successfully",
    transaction,
  });
}


export const updateTransaction = async (
  req: Request,
  res: Response
) => {
  // #swagger.tags = ['Transactions']

  const userId = req.user?.userId;
const id = String(req.params.id);
  if (!userId) {
    throw new ApiError(
      "User not authenticated",
      StatusCodes.UNAUTHORIZED
    );
  }

  const {
    amount,
    categoryId,
    name,
    description,
    type,
    paymentMethod,
  } = req.body;

  const existingTransaction = await prisma.transaction.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!existingTransaction) {
    throw new ApiError(
      "Transaction not found",
      StatusCodes.NOT_FOUND
    );
  }

  const transaction = await prisma.transaction.update({
    where: {
      id,
    },
    data: {
      amount: amount !== undefined ? Number(amount) : undefined,
      categoryId: categoryId !== undefined
        ? String(categoryId)
        : undefined,
      name,
      description,
      type,
      paymentMethod,
    },
    include: {
      category: true,
    },
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Transaction updated successfully",
    transaction,
  });
};

