import { Application } from "express";
import authRoute from "./route";

export const applicationRoute = (app: Application) => {
  app.use("/api/v1", authRoute);
};
