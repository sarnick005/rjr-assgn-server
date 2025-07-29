import { Router } from "express";
import {
  createInvoiceController,
  getInvoicesByIndividualClientController,
  getInvoicesByOrganizationClientController,
  getInvoiceByIdController,
  updateInvoiceController,
  deleteInvoiceController,
} from "./invoice.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const invoiceRouter = Router();

invoiceRouter.use(authMiddleware);

invoiceRouter.post("/", createInvoiceController);
invoiceRouter.get("/:invoiceId", getInvoiceByIdController);
invoiceRouter.put("/:invoiceId", updateInvoiceController);
invoiceRouter.delete("/:invoiceId", deleteInvoiceController);
invoiceRouter.get(
  "/individual-client/:individualClientId",
  getInvoicesByIndividualClientController
);
invoiceRouter.get(
  "/organization-client/:organizationClientId",
  getInvoicesByOrganizationClientController
);

export default invoiceRouter;
