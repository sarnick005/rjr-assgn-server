import { Router } from "express";
import {
  createInvoiceController,
  updateInvoiceController,
  deleteInvoiceController,
} from "./invoice.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const invoiceRouter = Router();

invoiceRouter.use(authMiddleware);

invoiceRouter.post("/:clientId", createInvoiceController);
invoiceRouter.put("/:invoiceId", updateInvoiceController);
invoiceRouter.delete("/:invoiceId", deleteInvoiceController);

export default invoiceRouter;
