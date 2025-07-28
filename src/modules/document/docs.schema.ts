import { z } from "zod";

export const documentUploadSchema = z.object({
  type: z.enum([
    "AADHAAR",
    "PAN",
    "GST_CERT",
    "CIN_DOC",
    "ITR_ACK",
    "FINANCIALS",
    "OTHER",
  ]),
});
