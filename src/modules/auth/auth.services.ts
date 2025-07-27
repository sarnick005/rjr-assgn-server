import { db } from "../../shared/config/db";
import bcrypt from "bcryptjs";
import { SigninBody, SignupBody } from "./auth.type";
import { ApiError } from "../../shared/utils";
import { JWT_SECRET } from "../../shared/config/env";
import jwt from "jsonwebtoken";

export const signupUser = async (data: SignupBody) => {
  const { firstName, lastName, email, password, phone, role } = data;

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      role,
    },
  });

  return user;
};

export const signinUser = async (data: SigninBody) => {
  const { email, password } = data;

  const existingUser = await db.user.findUnique({ where: { email } });
  if (!existingUser) {
    throw new ApiError(409, "User doesn't exist");
  }
  const hashedPassword = existingUser.password;
  const passwordMatch = bcrypt.compare(password, hashedPassword);
  if (!passwordMatch) {
    throw new ApiError(400, "Invalid credentials");
  }
  const accessToken = jwt.sign({ id: existingUser.id }, JWT_SECRET, {
    expiresIn: "1d",
  });
  return accessToken;
};
