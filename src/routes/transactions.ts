import { Router } from "express";
import { createTransaction, getTransactionById, getTransactions, updateTransaction } from "../controllers/transactionsController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const transactionsRouter = Router();

transactionsRouter.get("/", authMiddleware, getTransactions);
transactionsRouter.post("/", authMiddleware, createTransaction);
transactionsRouter.get("/:id", authMiddleware, getTransactionById);
transactionsRouter.patch("/update/:id", authMiddleware, updateTransaction);




export { transactionsRouter };
