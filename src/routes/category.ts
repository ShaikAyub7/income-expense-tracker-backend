import { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.post("/", createCategory);

export { categoryRouter };
