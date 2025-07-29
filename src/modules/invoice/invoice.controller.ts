import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../../shared/utils";
import { createInvoiceSchema } from "./invoice.schema";
import {
  createInvoiceService,
  getInvoicesByIndividualClientService,
  getInvoicesByOrganizationClientService,
  getInvoiceByIdService,
  updateInvoiceService,
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

export const getInvoicesByIndividualClientController = asyncHandler(
  async (req: Request, res: Response) => {
    const individualClientId = req.params.individualClientId;
    if (!individualClientId)
      throw new ApiError(400, "Missing individual client ID");
    const invoices = await getInvoicesByIndividualClientService(
      individualClientId
    );
    res
      .status(200)
      .json(new ApiResponse(200, invoices, "Invoices fetched successfully"));
  }
);

export const getInvoicesByOrganizationClientController = asyncHandler(
  async (req: Request, res: Response) => {
    const organizationClientId = req.params.organizationClientId;
    if (!organizationClientId)
      throw new ApiError(400, "Missing organization client ID");
    const invoices = await getInvoicesByOrganizationClientService(
      organizationClientId
    );
    res
      .status(200)
      .json(new ApiResponse(200, invoices, "Invoices fetched successfully"));
  }
);

export const getInvoiceByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const invoiceId = req.params.invoiceId;
    if (!invoiceId) throw new ApiError(400, "Missing invoice ID");
    const invoice = await getInvoiceByIdService(invoiceId);
    if (!invoice) throw new ApiError(404, "Invoice not found");
    res
      .status(200)
      .json(new ApiResponse(200, invoice, "Invoice fetched successfully"));
  }
);

export const updateInvoiceController = asyncHandler(
  async (req: Request, res: Response) => {
    const invoiceId = req.params.invoiceId;
    if (!invoiceId) throw new ApiError(400, "Missing invoice ID");

    const parsed = createInvoiceSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, "Invalid input");
    }

    const invoice = await updateInvoiceService(invoiceId, parsed.data);
    res
      .status(200)
      .json(new ApiResponse(200, invoice, "Invoice updated successfully"));
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
