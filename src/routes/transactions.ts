import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactions,
  updateTransaction,
} from "../controllers/transactionsController";

const transactionsRouter = Router();

transactionsRouter.get("/", getTransactions);
transactionsRouter.post("/", createTransaction);
transactionsRouter.get("/:id", getTransactionById);
transactionsRouter.patch("/:id", updateTransaction);
transactionsRouter.delete("/:id", deleteTransaction);


export { transactionsRouter };
