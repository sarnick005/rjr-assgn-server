import { Router } from "express";

const router = Router();

import authRouter from "./modules/auth/auth.routes";
import clientRouter from "./modules/clients/client.route";
import documentRouter from "./modules/document/docs.route";
import invoiceRouter from "./modules/invoice/invoice.route";
import complianceRouter from "./modules/compliance/compliance.route";

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/client", clientRouter);
router.use("/api/v1/document", documentRouter);
router.use("/api/v1/invoice", invoiceRouter);
router.use("/api/v1/compliance", complianceRouter);

export default router