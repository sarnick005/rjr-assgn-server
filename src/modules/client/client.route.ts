import { Router } from "express";

import {
  getGeneralDetails,
  updateGeneralDetails,
} from "./controller/common.controller";

import {
  createIndividualDetails,
  getIndividualDetails,
  updateIndividualDetails,
  deleteIndividualDetails,
} from "./controller/individual";

import {
  createOrganization,
  getOrganizationDetails,
  updateOrganizationDetails,
  deleteOrganization,
} from "./controller/organization";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const clientRouter = Router();

clientRouter.use(authMiddleware);

// COMMON

clientRouter.get("/:clientId/general", getGeneralDetails);
clientRouter.patch("/:clientId/general", updateGeneralDetails);

// INDIVIDUAL CLIENT

clientRouter.post("/:clientId/individual", createIndividualDetails);
clientRouter.get("/:clientId/individual", getIndividualDetails);
clientRouter.patch("/:clientId/individual", updateIndividualDetails);
clientRouter.delete("/:clientId/individual", deleteIndividualDetails);

// ORGANIZATION CLIENT

clientRouter.post("/:clientId/organization", createOrganization);
clientRouter.get("/:clientId/organization", getOrganizationDetails);
clientRouter.patch("/:clientId/organization", updateOrganizationDetails);
clientRouter.delete("/:clientId/organization", deleteOrganization);

export default clientRouter;
