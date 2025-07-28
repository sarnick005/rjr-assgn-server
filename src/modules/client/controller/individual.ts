import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../../../shared/utils";
import { individualClientSchema } from "../client.schema";
import {
  createIndividualDetailsService,
  deleteIndividualDetailsService,
  getIndividualClientDetailsById,
  updateIndividualDetailsService,
} from "../client.services";

export const createIndividualDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const result = individualClientSchema.safeParse(req.body);
    if (!result.success) {
      throw new ApiError(400, "Validation failed for individual details");
    }

    const clientId = req.params.clientId;
    if (!clientId) {
      throw new ApiError(400, "Client ID is required");
    }

    const data = await createIndividualDetailsService(result.data, clientId);

    const response = new ApiResponse(
      201,
      data,
      "Individual client details created successfully"
    );
    res.status(201).json(response);
  }
);

export const updateIndividualDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const result = individualClientSchema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(400, "Error at validating details for client");
    }

    const clientId = req.params.clientId;

    const data = await updateIndividualDetailsService(result.data, clientId);

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

export const getIndividualDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const clientId = req.params.clientId;
    const data = await getIndividualClientDetailsById(clientId);
    if (!data) {
      throw new ApiError(400, "Can't get Individual details");
    }
    const response = new ApiResponse(
      200,
      { data },
      "Individual Details fetched successfully"
    );
    res.status(200).json(response);
  }
);
export const deleteIndividualDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const clientId = req.params.clientId;
    if (!clientId) {
      throw new ApiError(400, "Client ID is required");
    }

    const result = await deleteIndividualDetailsService(clientId);

    const response = new ApiResponse(
      200,
      result,
      "Client and individual details deleted successfully"
    );
    res.status(200).json(response);
  }
);
