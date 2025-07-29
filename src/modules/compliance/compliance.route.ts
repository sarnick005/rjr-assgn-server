import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware";
import {
  createComplianceController,
  deleteComplianceController,
  updateComplianceController,
} from "./compliance.controller";

const complianceRouter = Router();

complianceRouter.use(authMiddleware);

complianceRouter.post("/:clientId/create", createComplianceController);

complianceRouter.put("/:complianceId", updateComplianceController);

complianceRouter.delete("/:complianceId", deleteComplianceController);

export default complianceRouter;
