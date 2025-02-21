import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import "reflect-metadata";
import dotenv from "dotenv";
import { ErrorGuard } from "./global/middleware";
import connection from "./global/config";
import { applicationRoute } from "./router";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(ErrorGuard);
applicationRoute(app);

connection();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Error handling middleware

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("unexpected route!, Oh you missed road");
  next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    },
  });
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`application server start: http://localhost:${PORT}`);
});
