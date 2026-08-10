import { Router } from "express";
import { login, register } from "../controllers/authController";

const authRouter = Router();

// #swagger.tags = ['Authentication']
authRouter.post("/register", register);
authRouter.post("/login", login);

export { authRouter };
