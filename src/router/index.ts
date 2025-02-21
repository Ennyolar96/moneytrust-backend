import { Application, Request, Response } from "express";
import authRoute from "./route";

export const applicationRoute = (app: Application) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });
  app.use("/api/v1", authRoute);
};
