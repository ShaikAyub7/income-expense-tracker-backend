import "dotenv/config";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import swaggerDocument from "./swagger-output.json";
import { errorHandler } from "./middlewares/ErrorHandler";
import { pageNotFound } from "./middlewares/PageNotFound";
import { authRouter } from "./routes/auth";
import { transactionsRouter } from "./routes/transactions";
import { categoryRouter } from "./routes/category";
import { authMiddleware } from "./middlewares/AuthMiddleware";

const app = express();

app.use(morgan("dev"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/transactions",authMiddleware, transactionsRouter);
app.use("/api/category",authMiddleware ,categoryRouter);


app.use(pageNotFound);
app.use(errorHandler);

const port = Number(process.env.PORT) || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`server is running on ${port}`);
});
