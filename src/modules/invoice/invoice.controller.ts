import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../../shared/utils";
import { createInvoiceSchema } from "./invoice.schema";
import {
  createInvoiceService,
  getInvoicesByClientService,
  deleteInvoiceService,
} from "./invoice.services";

export const createInvoiceController = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = createInvoiceSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, "Invalid input");
    }

    const invoice = await createInvoiceService(parsed.data);
    res
      .status(201)
      .json(new ApiResponse(201, invoice, "Invoice created successfully"));
  }
);

export const getInvoicesByClientController = asyncHandler(
  async (req: Request, res: Response) => {
    const clientDetailsId = req.params.clientDetailsId;
    if (!clientDetailsId) throw new ApiError(400, "Missing client ID");

    const invoices = await getInvoicesByClientService(clientDetailsId);
    res
      .status(200)
      .json(new ApiResponse(200, invoices, "Invoices fetched successfully"));
  }
);

export const deleteInvoiceController = asyncHandler(
  async (req: Request, res: Response) => {
    const invoiceId = req.params.invoiceId;
    if (!invoiceId) throw new ApiError(400, "Missing invoice ID");

    await deleteInvoiceService(invoiceId);
    res
      .status(200)
      .json(new ApiResponse(200, null, "Invoice deleted successfully"));
  }
);
