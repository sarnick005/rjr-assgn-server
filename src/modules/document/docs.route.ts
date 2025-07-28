import { Router } from "express";
import {
  uploadDocumentController,
  deleteDocumentController,
  getClientDocumentsController,
} from "./docs.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";
import { uploadMulterMiddleware } from "../../shared/middleware/multer.middleware";

const documentRouter = Router();

documentRouter.use(authMiddleware);

documentRouter.post(
  "/upload/:clientId",
  uploadMulterMiddleware.fields([{ name: "document", maxCount: 1 }]),
  uploadDocumentController
);

documentRouter.delete("/:documentId", deleteDocumentController);

documentRouter.get("/client/:clientId", getClientDocumentsController);

export default documentRouter;
