import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ForgetPassword, Login, Register, Verify } from "./entity";
import { validate } from "class-validator";
import { AuthServices } from "./services";

const authServices = new AuthServices();
export const AuthController = {
  signin: asyncHandler(async (req: Request, res: Response) => {
    try {
      const body = plainToInstance(Login, req.body);
      const errors = await validate(body);
      if (errors.length > 0) {
        const formattedError = errors.map((error) => ({
          property: error.property,
          message: error.constraints,
        }));

        res.status(400).json({ success: false, errors: formattedError });
        return;
      }

      const user = await authServices.signin(body);
      res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }),

  signup: asyncHandler(async (req: Request, res: Response) => {
    try {
      const body = plainToInstance(Register, req.body);
      const errors = await validate(body);
      if (errors.length > 0) {
        const formattedError = errors.map((error) => ({
          property: error.property,
          message: error.constraints,
        }));

        res.status(400).json({ success: false, errors: formattedError });
        return;
      }
      const user = await authServices.signup(body);
      res.status(201).json({ success: true, data: user });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }),

  forgetPassword: asyncHandler(async (req: Request, res: Response) => {
    try {
      const body = plainToInstance(ForgetPassword, req.body);
      const errors = await validate(body);
      if (errors.length > 0) {
        const formattedError = errors.map((error) => ({
          property: error.property,
          message: error.constraints,
        }));

        res.status(400).json({ success: false, errors: formattedError });
        return;
      }
      const user = await authServices.forgetPassword(body);
      res.status(200).json({ success: true, message: user });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }),

  verifyEmail: asyncHandler(async (req: Request, res: Response) => {
    try {
      const body = plainToInstance(Verify, req.body);
      const errors = await validate(body);
      if (errors.length > 0) {
        const formattedError = errors.map((error) => ({
          property: error.property,
          message: error.constraints,
        }));

        res.status(400).json({ success: false, errors: formattedError });
        return;
      }
      const user = await authServices.verifyEmail(body);
      res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }),

  resendVerificationEmail: asyncHandler(async (req: Request, res: Response) => {
    try {
      const body = plainToInstance(ForgetPassword, req.body);
      const errors = await validate(body);
      if (errors.length > 0) {
        const formattedError = errors.map((error) => ({
          property: error.property,
          message: error.constraints,
        }));

        res.status(400).json({ success: false, errors: formattedError });
        return;
      }
      const user = await authServices.resendVerificationEmail(body);
      res.status(200).json({ success: true, message: user });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }),
};
