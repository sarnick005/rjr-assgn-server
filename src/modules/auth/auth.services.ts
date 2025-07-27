// auth.services.ts
import { db } from "../../shared/config/db";
import bcrypt from "bcryptjs";
import { RegisterBody } from "./auth.type";
import { ApiError } from "../../shared/utils";

export const registerUser = async (data: RegisterBody) => {
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
