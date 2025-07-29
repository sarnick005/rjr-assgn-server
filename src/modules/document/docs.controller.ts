import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../../shared/utils";
import { documentUploadSchema } from "./docs.schema";
import {
  deleteDocumentService,
  uploadDocumentService,
} from "./docs.services";

export const uploadDocumentController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new ApiError(400, "No file provided");
    }

    const parsed = documentUploadSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, "Invalid input data", parsed.error.issues);
    }

    const clientDetailsId = req.params.clientDetailsId;

    const doc = await uploadDocumentService(
      req.file.path,
      parsed.data,
      clientDetailsId
    );

    res
      .status(201)
      .json(new ApiResponse(201, doc, "Document uploaded successfully"));
  }
);

export const deleteDocumentController = asyncHandler(
  async (req: Request, res: Response) => {
    const documentId = req.params.documentId;
    await deleteDocumentService(documentId);

    res
      .status(200)
      .json(new ApiResponse(200, null, "Document deleted successfully"));
  }
);
