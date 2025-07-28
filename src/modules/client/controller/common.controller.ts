import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../../../shared/utils";
import { generalDetailsSchema } from "../client.schema";
import {
  getClientDetailsById,
  updateGeneralDetailsService,
} from "../client.services";

export const updateGeneralDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const result = generalDetailsSchema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(400, "Error at validating general details for client");
    }

    const clientId = req.params.clientId;

    const data = await updateGeneralDetailsService(result.data, clientId);

    if (!data) {
      throw new ApiError(400, "Can't update general details");
    }

    const response = new ApiResponse(
      200,
      data,
      "Client general details updated"
    );
    return res.status(200).json(response);
  }
);

export const getGeneralDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const clientId = req.params.clientId;
    const data = await getClientDetailsById(clientId);
    if (!data) {
      throw new ApiError(400, "Can't get  general details");
    }
    const response = new ApiResponse(
      200,
      { data },
      "General Details fetched successfully"
    );
    res.status(200).json(response);
  }
);
