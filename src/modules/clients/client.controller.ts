import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../../shared/utils";
import { individualClientSchema, orgSchema } from "./client.schema";
import { IndividualClientServices, OrgServices } from "./client.services";

// CREATE INDIVIDUAL CLIENT
export const createIndividualClient = asyncHandler(
  async (req: Request, res: Response) => {
    const result = individualClientSchema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(
        400,
        "ERROR WHILE TRYING TO VALIDATE INDIVIDUAL CLIENT",
        result.error.issues
      );
    }

    const data = await IndividualClientServices.create(
      result.data,
      req.user!.id
    );

    const response = new ApiResponse(
      201,
      { data },
      "NEW INDIVIDUAL CLIENT CREATED SUCCESSFULLY"
    );

    res.status(201).json(response);
  }
);

// UPDATE INDIVIDUAL CLIENT
export const updateIndividualClient = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "CLIENT ID IS REQUIRED");
    }

    const result = individualClientSchema.partial().safeParse(req.body);

    if (!result.success) {
      throw new ApiError(
        400,
        "ERROR WHILE TRYING TO VALIDATE INDIVIDUAL CLIENT UPDATE DATA",
        result.error.issues
      );
    }

    const data = await IndividualClientServices.update(id, result.data);

    const response = new ApiResponse(
      200,
      { data },
      "INDIVIDUAL CLIENT UPDATED SUCCESSFULLY"
    );

    res.status(200).json(response);
  }
);

// GET INDIVIDUAL CLIENT DETAILS
export const getIndividualClient = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "CLIENT ID IS REQUIRED");
    }

    const data = await IndividualClientServices.getById(id);

    if (!data) {
      throw new ApiError(404, "INDIVIDUAL CLIENT NOT FOUND");
    }

    const response = new ApiResponse(
      200,
      { data },
      "INDIVIDUAL CLIENT DETAILS RETRIEVED SUCCESSFULLY"
    );

    res.status(200).json(response);
  }
);

// GET ALL INDIVIDUAL CLIENTS
export const getAllIndividualClients = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search } = req.query;

    const data = await IndividualClientServices.getAll({
      page: Number(page),
      limit: Number(limit),
      search: search as string,
    });

    const response = new ApiResponse(
      200,
      data,
      "INDIVIDUAL CLIENTS RETRIEVED SUCCESSFULLY"
    );

    res.status(200).json(response);
  }
);

// DELETE INDIVIDUAL CLIENT
export const deleteIndividualClient = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "CLIENT ID IS REQUIRED");
    }

    await IndividualClientServices.delete(id);

    const response = new ApiResponse(
      200,
      null,
      "INDIVIDUAL CLIENT DELETED SUCCESSFULLY"
    );

    res.status(200).json(response);
  }
);

// CREATE ORG CLIENT
export const createOrgClient = asyncHandler(
  async (req: Request, res: Response) => {
    const result = orgSchema.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(
        400,
        "ERROR WHILE TRYING TO VALIDATE ORGANIZATION CLIENT",
        result.error.issues
      );
    }

    const data = await OrgServices.create(result.data, req.user!.id);

    const response = new ApiResponse(
      201,
      { data },
      "NEW ORGANIZATION CLIENT CREATED SUCCESSFULLY"
    );

    res.status(201).json(response);
  }
);

// UPDATE ORG CLIENT
export const updateOrgClient = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "ORGANIZATION CLIENT ID IS REQUIRED");
    }

    const result = orgSchema.partial().safeParse(req.body);

    if (!result.success) {
      throw new ApiError(
        400,
        "ERROR WHILE TRYING TO VALIDATE ORGANIZATION CLIENT UPDATE DATA",
        result.error.issues
      );
    }

    const data = await OrgServices.update(id, result.data);

    const response = new ApiResponse(
      200,
      { data },
      "ORGANIZATION CLIENT UPDATED SUCCESSFULLY"
    );

    res.status(200).json(response);
  }
);

// GET ORG CLIENT DETAILS
export const getOrgClient = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "ORGANIZATION CLIENT ID IS REQUIRED");
    }

    const data = await OrgServices.getById(id);

    if (!data) {
      throw new ApiError(404, "ORGANIZATION CLIENT NOT FOUND");
    }

    const response = new ApiResponse(
      200,
      { data },
      "ORGANIZATION CLIENT DETAILS RETRIEVED SUCCESSFULLY"
    );

    res.status(200).json(response);
  }
);

// GET ALL ORG CLIENTS
export const getAllOrgClients = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search } = req.query;

    const data = await OrgServices.getAll({
      page: Number(page),
      limit: Number(limit),
      search: search as string,
    });

    const response = new ApiResponse(
      200,
      data,
      "ORGANIZATION CLIENTS RETRIEVED SUCCESSFULLY"
    );

    res.status(200).json(response);
  }
);

// DELETE ORG CLIENT
export const deleteOrgClient = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "ORGANIZATION CLIENT ID IS REQUIRED");
    }

    await OrgServices.delete(id);

    const response = new ApiResponse(
      200,
      null,
      "ORGANIZATION CLIENT DELETED SUCCESSFULLY"
    );

    res.status(200).json(response);
  }
);
