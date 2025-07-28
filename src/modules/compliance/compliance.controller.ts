import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../../shared/utils";
import {
  createComplianceService,
  deleteComplianceService,
  getCompliancesByClientService,
} from "./compliance.services";
import { createComplianceSchema } from "./compliance.schema";

export const createComplianceController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = createComplianceSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, "Invalid input");
    }

    const record = await createComplianceService(parsed.data);

    res
      .status(201)
      .json(new ApiResponse(201, record, "Compliance record created"));
  }
);

export const getCompliancesByClientController = asyncHandler(
  async (req: Request, res: Response) => {
    const clientDetailsId = req.params.clientDetailsId;
    if (!clientDetailsId) throw new ApiError(400, "Client ID is required");

    const records = await getCompliancesByClientService(clientDetailsId);

    res
      .status(200)
      .json(new ApiResponse(200, records, "Compliance records fetched"));
  }
);

export const deleteComplianceController = asyncHandler(
  async (req: Request, res: Response) => {
    const complianceId = req.params.complianceId;
    if (!complianceId) throw new ApiError(400, "Compliance ID is required");

    await deleteComplianceService(complianceId);

    res
      .status(200)
      .json(new ApiResponse(200, null, "Compliance record deleted"));
  }
);
