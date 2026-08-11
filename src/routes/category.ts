import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.post("/", createCategory);
categoryRouter.get("/:id",getCategoryById)
categoryRouter.patch("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);



export { categoryRouter };
