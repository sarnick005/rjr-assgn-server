import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../../shared/utils";
import {
  createComplianceService,
  deleteComplianceService,
  getCompliancesByIndividualClientService,
  getCompliancesByOrganizationClientService,
  updateComplianceService,
} from "./compliance.services";
import { createComplianceSchema } from "./compliance.schema";

export const createComplianceController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = createComplianceSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, "Invalid input", parsed.error.issues);
    }
    const record = await createComplianceService(parsed.data);
    res
      .status(201)
      .json(new ApiResponse(201, record, "Compliance record created"));
  }
);

export const getCompliancesByIndividualClientController = asyncHandler(
  async (req: Request, res: Response) => {
    const individualClientId = req.params.individualClientId;
    if (!individualClientId) {
      throw new ApiError(400, "Individual Client ID is required");
    }
    const records = await getCompliancesByIndividualClientService(
      individualClientId
    );
    res
      .status(200)
      .json(new ApiResponse(200, records, "Compliance records fetched"));
  }
);

export const getCompliancesByOrganizationClientController = asyncHandler(
  async (req: Request, res: Response) => {
    const organizationClientId = req.params.organizationClientId;
    if (!organizationClientId) {
      throw new ApiError(400, "Organization Client ID is required");
    }
    const records = await getCompliancesByOrganizationClientService(
      organizationClientId
    );
    res
      .status(200)
      .json(new ApiResponse(200, records, "Compliance records fetched"));
  }
);

export const updateComplianceController = asyncHandler(
  async (req: Request, res: Response) => {
    const complianceId = req.params.complianceId;
    if (!complianceId) {
      throw new ApiError(400, "Compliance ID is required");
    }

    const parsed = createComplianceSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, "Invalid input", parsed.error.issues);
    }

    const record = await updateComplianceService(complianceId, parsed.data);
    res
      .status(200)
      .json(new ApiResponse(200, record, "Compliance record updated"));
  }
);

export const deleteComplianceController = asyncHandler(
  async (req: Request, res: Response) => {
    const complianceId = req.params.complianceId;
    if (!complianceId) {
      throw new ApiError(400, "Compliance ID is required");
    }
    await deleteComplianceService(complianceId);
    res
      .status(200)
      .json(new ApiResponse(200, null, "Compliance record deleted"));
  }
);
