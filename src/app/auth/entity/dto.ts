import {
  IsDate,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { forgetPassword, login, register, Role, verify } from "./interface";
import { Transform } from "class-transformer";

export class Register implements register {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsIn(Object.values(Role))
  role: Role = Role.Individual;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  businessType?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateOfIncorporate?: Date;
}

export class Login implements login {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class Verify implements verify {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

export class ForgetPassword implements forgetPassword {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
