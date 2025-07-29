import { CloudinaryService } from "../../lib/cloudinary";
import { db } from "../../shared/config/db";
import { DocumentUploadInput } from "./docs.type";

export const uploadDocumentService = async (
  filePath: string,
  body: DocumentUploadInput,
  clientId: string
) => {
  const cloudinaryRes = await CloudinaryService.upload(filePath);

  if (!cloudinaryRes?.secure_url) {
    throw new Error("Document upload failed");
  }

  const data: any = {
    type: body.type,
    url: cloudinaryRes.secure_url,
    clientId,
  };

  const newDoc = await db.document.create({ data });
  return newDoc;
};

export const deleteDocumentService = async (documentId: string) => {
  const document = await db.document.findUnique({
    where: { id: documentId },
  });

  if (!document) {
    throw new Error("Document not found");
  }

  await CloudinaryService.delete(document.url);

  return db.document.delete({
    where: { id: documentId },
  });
};
