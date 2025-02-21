import { VerificationToken } from "@/global/helpers";
import { forgetPassword, IUser, login, register, verify } from "./entity";
import * as argon from "argon2";
import jwt from "jsonwebtoken";
import { User } from "@/global/model";
import { sendEmail, template } from "@/global/mail";

export class AuthServices {
  public async signin(data: login): Promise<IUser> {
    try {
      const { encode } = this.passwordEncodeAndDecode();
      const user = await User.findOne({ email: data.email });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      if (!user.isVerified) {
        await this.resendEmail(user.email, user.firstName);
        throw new Error("Please verify your email address");
      }

      if (!(await encode(user.password, data.password))) {
        throw new Error("Invalid email or password");
      }

      const { password, ...response } = user.toObject();
      const token = await this.generateToken(response);
      return { ...response, token };
    } catch (error) {
      throw error;
    }
  }

  public async signup(data: register) {
    try {
      const user = await User.findOne({ email: data.email });

      if (user) {
        throw new Error("Email already in use");
      }

      const hashedPassword = await this.passwordEncodeAndDecode().decode(
        data.password
      );
      const verificationToken = VerificationToken(4);
      const verificationExpires = new Date(
        new Date().getTime() + 15 * 60 * 1000
      ).getTime();

      const newUser = await User.create({
        ...data,
        password: hashedPassword,
        verificationToken,
        verificationExpires,
      });

      const { password, ...response } = newUser.toObject();
      await sendEmail(template.welcome, data.email, "Welcome", {
        username: response.username,
        token: verificationToken,
        currentYear: new Date().getFullYear(),
      });
      return response;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error("Email or username already exists");
      }
      throw error;
    }
  }

  public async forgetPassword(
    data: forgetPassword
  ): Promise<{ message: String }> {
    try {
      const findUser = await User.findOne({ email: data.email });

      if (!findUser) {
        throw new Error("User not found");
      }

      const verificationToken = VerificationToken(4);
      const verificationExpires = new Date(
        new Date().getTime() + 15 * 60 * 1000
      ).getTime();

      await User.updateOne(
        { _id: findUser._id },
        { $set: { verificationToken, verificationExpires } }
      );

      // send email with the token and email
      await sendEmail(template.forget, findUser.email, "Reset Password", {
        username: findUser.firstName,
        token: verificationToken,
        currentYear: new Date().getFullYear(),
      });

      return { message: "Reset password link sent to your email" };
    } catch (error) {
      throw error;
    }
  }

  public async verifyEmail(data: verify): Promise<IUser> {
    try {
      const user = await User.findOneAndUpdate(
        {
          email: data.email,
          verificationToken: data.code,
          verificationExpires: { $gt: new Date().getTime() },
        },
        {
          $set: {
            isVerified: true,
            verificationToken: null,
            verificationExpires: null,
          },
        },
        { new: true }
      );

      if (!user) {
        throw new Error("Invalid token or token expired");
      }

      const { password, ...response } = user.toObject();
      const token = await this.generateToken(response);
      return { ...response, token };
    } catch (error) {
      throw error;
    }
  }

  public async resendVerificationEmail(data: {
    email: string;
  }): Promise<String> {
    try {
      const user = await User.findOne({ email: data.email });
      if (!user) {
        throw new Error("User not found");
      }
      await this.resendEmail(user.email, user.firstName);
      return "Verification email sent to your email";
    } catch (error) {
      throw error;
    }
  }

  private async resendEmail(email: string, username: string): Promise<string> {
    try {
      const verificationToken = VerificationToken(4);
      const verificationExpires = new Date(
        new Date().getTime() + 15 * 60 * 1000
      ).getTime();

      await User.updateOne(
        { email },
        { $set: { verificationToken, verificationExpires } }
      );

      await sendEmail(
        template.verify,
        email,
        `Verification your email ${username}`,
        {
          token: verificationToken,
          currentYear: new Date().getFullYear(),
        }
      );

      return "Verification email sent successfully";
    } catch (error) {
      throw error;
    }
  }

  private passwordEncodeAndDecode() {
    const decode = async (password: string): Promise<string> => {
      return await argon.hash(password);
    };

    const encode = async (
      user_password: string,
      password: string
    ): Promise<boolean> => {
      return await argon.verify(user_password, password);
    };

    return { decode, encode };
  }

  private async generateToken(data: register): Promise<String> {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
  }
}
