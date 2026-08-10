import { Router } from "express";
import { createTransaction } from "../controllers/transactionsController";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { createCategory, getCategories } from "../controllers/categoryController";

const categoryRouter = Router();

categoryRouter.get("/",authMiddleware, getCategories);
categoryRouter.post("/", authMiddleware, createCategory);

export { categoryRouter };
