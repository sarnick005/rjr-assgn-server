import { Router } from "express";
import {
  uploadDocumentController,
  deleteDocumentController,
} from "./docs.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";
import { uploadMulterMiddleware } from "../../shared/middleware/multer.middleware";

const documentRouter = Router();

documentRouter.use(authMiddleware);

documentRouter.post(
  "/upload/:clientDetailsId",
  uploadMulterMiddleware.single("document"),
  uploadDocumentController
);

documentRouter.delete("/:documentId", deleteDocumentController);

export default documentRouter;
