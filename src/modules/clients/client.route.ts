import { Router } from "express";
import {
  createIndividualClient,
  updateIndividualClient,
  getIndividualClient,
  getAllIndividualClients,
  deleteIndividualClient,
  createOrgClient,
  updateOrgClient,
  getOrgClient,
  getAllOrgClients,
  deleteOrgClient,
} from "./client.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const clientRouter = Router();

clientRouter.use(authMiddleware);

// CREATE INDIVIDUAL
clientRouter.post("/individual", createIndividualClient);

// UPDATE INDIVIDUAL
clientRouter.put("/individual/:id", updateIndividualClient);

// GET BY ID INDIVIDUAL
clientRouter.get("/individual/:id", getIndividualClient);

// GET ALL INDIVIDUAL
clientRouter.get("/individual", getAllIndividualClients);

// DELETE INDIVIDUAL
clientRouter.delete("/individual/:id", deleteIndividualClient);

// CREATE ORG
clientRouter.post("/organization", createOrgClient);

// UPDATE ORG
clientRouter.put("/organization/:id", updateOrgClient);

// GET BY ID ORG
clientRouter.get("/organization/:id", getOrgClient);

// GET ALL ORG
clientRouter.get("/organization", getAllOrgClients);

// DELETE ORG
clientRouter.delete("/organization/:id", deleteOrgClient);

export default clientRouter;
