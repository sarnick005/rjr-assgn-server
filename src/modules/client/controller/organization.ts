import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../../../shared/utils";
import {
  individualClientSchema,
  organizationClientSchema,
} from "../client.schema";
import {
  createOrganizationService,
  deleteOrganizationService,
  getClientDetailsById,
  updateOrganizationDetailsService,
} from "../client.services";

export const createOrganization = asyncHandler(
  async (req: Request, res: Response) => {
    const result = organizationClientSchema.safeParse(req.body);
    if (!result.success) {
      throw new ApiError(400, "Error at validating details for organization");
    }

    const clientId = req.params.clientId;
    if (!clientId) {
      throw new ApiError(400, "Client ID is required in the URL");
    }

    const data = await createOrganizationService(result.data, clientId);

    res
      .status(201)
      .json(
        new ApiResponse(201, data, "Organization details created successfully")
      );
  }
);

export const updateOrganizationDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const result = organizationClientSchema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(
        400,
        "Error at validating details for organization for update"
      );
    }

    const clientId = req.params.clientId;

    const data = await updateOrganizationDetailsService(result.data, clientId);

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

export const getOrganizationDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const clientId = req.params.clientId;
    const data = await getClientDetailsById(clientId);
    if (!data) {
      throw new ApiError(400, "Can't get Individual general details");
    }
    const response = new ApiResponse(
      200,
      { data },
      "General Details fetched successfully"
    );
    res.status(200).json(response);
  }
);
export const deleteOrganization = asyncHandler(
  async (req: Request, res: Response) => {
    const clientId = req.params.clientId;

    if (!clientId) {
      throw new ApiError(400, "Client ID is required");
    }

    const result = await deleteOrganizationService(clientId);

    res
      .status(200)
      .json(
        new ApiResponse(200, result, "Organization client deleted successfully")
      );
  }
);
