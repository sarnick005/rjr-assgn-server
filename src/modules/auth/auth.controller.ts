import { Request, Response } from "express";
import { signinSchema, signupSchema } from "./auth.schema";
import { signinUser, signupUser } from "./auth.services";
import { ApiError, ApiResponse, asyncHandler } from "../../shared/utils";

export const signupController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(400, "Registration Validation Failed");
    }

    const user = await signupUser(result.data);

    if (!user) {
      throw new ApiError(400, "Failed to create user");
    }

    const response = new ApiResponse(
      201,
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      "User signuped successfully"
    );

    res.status(201).json(response);
  }
);

export const signinController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = signinSchema.safeParse(req.body);
    if (!result.success) {
      throw new ApiError(400, "Signin Validation Failed");
    }

    const accessToken = await signinUser(result.data);

    if (!accessToken) {
      throw new ApiError(400, "Failed to signin user");
    }
    const response = new ApiResponse(
      200,
      { token: accessToken },
      "User logged in successfully"
    );
    res.status(200).json(response);
  }
);
