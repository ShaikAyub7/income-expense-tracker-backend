import { Router } from "express";
import { createTransaction, getTransactionById, getTransactions, updateTransaction } from "../controllers/transactionsController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const transactionsRouter = Router();

transactionsRouter.get("/", getTransactions);
transactionsRouter.post("/", createTransaction);
transactionsRouter.get("/:id", getTransactionById);
transactionsRouter.patch("/:id", updateTransaction);




export { transactionsRouter };
