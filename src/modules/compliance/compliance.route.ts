import { Router } from "express";
import {
  createComplianceController,
  deleteComplianceController,
  getCompliancesByClientController,
} from "./compliance.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const complianceRouter = Router();
complianceRouter.use(authMiddleware);

complianceRouter.post("/", createComplianceController);
complianceRouter.get(
  "/client/:clientDetailsId",
  getCompliancesByClientController
);
complianceRouter.delete("/:complianceId", deleteComplianceController);

export default complianceRouter;
