import { Request, Response } from "express";
import { registerSchema } from "./auth.schema";
import { registerUser } from "./auth.services";
import { ApiError, ApiResponse, asyncHandler } from "../../shared/utils";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(400, "Validation Failed");
    }

    const user = await registerUser(result.data);

    const response = new ApiResponse(
      201,
      {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      "User registered successfully"
    );

    res.status(201).json(response);
  }
);
