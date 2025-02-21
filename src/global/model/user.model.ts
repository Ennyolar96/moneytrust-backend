import { IUser, Role } from "@/app/auth/entity";
import { Schema } from "mongoose";
import { getModel } from "./model.factory";

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    companyName: { type: String, required: false },
    businessType: { type: String, required: false },
    dateOfIncorporate: { type: Date, required: false },
    role: { type: String, enum: Object.values(Role), required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: Number, required: true },
    verificationExpires: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export type UserDocument = IUser & Document;
export const User: any = getModel<UserDocument>("users", userSchema);
