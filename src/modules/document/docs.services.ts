import { CloudinaryService } from "../../lib/cloudinary";
import { db } from "../../shared/config/db";
import { DocumentUploadInput } from "./docs.type";

export const uploadDocumentService = async (
  filePath: string,
  body: DocumentUploadInput,
  clientDetailsId: string
) => {
  const cloudinaryRes = await CloudinaryService.upload(filePath);

  if (!cloudinaryRes || !cloudinaryRes.secure_url) {
    throw new Error("Document upload failed");
  }

  const newDoc = await db.document.create({
    data: {
      type: body.type,
      url: cloudinaryRes.secure_url,
      individualClientId: clientDetailsId,
      organizationClientId: clientDetailsId,
    },
  });

  return newDoc;
};

export const getClientDocumentsService = async (clientDetailsId: string) => {
  return db.document.findMany({
    where: {
      OR: [
        { individualClientId: clientDetailsId },
        { organizationClientId: clientDetailsId },
      ],
    },
    orderBy: { uploadedAt: "desc" },
  });
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
