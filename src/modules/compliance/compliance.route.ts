import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware";
import {
  createComplianceController,
  deleteComplianceController,
  getCompliancesByIndividualClientController,
  getCompliancesByOrganizationClientController,
  updateComplianceController,
} from "./compliance.controller";

const complianceRouter = Router();

complianceRouter.use(authMiddleware);

complianceRouter.post("/", createComplianceController);

complianceRouter.get(
  "/individual-client/:individualClientId",
  getCompliancesByIndividualClientController
);

complianceRouter.get(
  "/organization-client/:organizationClientId",
  getCompliancesByOrganizationClientController
);

complianceRouter.put("/:complianceId", updateComplianceController);

complianceRouter.delete("/:complianceId", deleteComplianceController);

export default complianceRouter;
