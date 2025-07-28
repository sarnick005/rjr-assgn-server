import { Router } from "express";
import {
  createInvoiceController,
  getInvoicesByClientController,
  deleteInvoiceController,
} from "./invoice.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const invoiceRouter = Router();
invoiceRouter.use(authMiddleware);

invoiceRouter.post("/", createInvoiceController);
invoiceRouter.get("/client/:clientDetailsId", getInvoicesByClientController);
invoiceRouter.delete("/:invoiceId", deleteInvoiceController);

export default invoiceRouter;
