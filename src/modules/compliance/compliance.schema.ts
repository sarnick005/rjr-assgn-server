import { z } from "zod";

export const createComplianceSchema = z
  .object({
    type: z.enum(["ITR", "GST", "TDS", "ROC", "ADVANCE_TAX"]),
    dueDate: z.coerce.date(),
    filedOn: z.coerce.date().optional(),
    status: z.enum(["PENDING", "FILED", "OVERDUE"]),
    remarks: z.string().optional(),
    individualClientId: z.string().optional(),
    organizationClientId: z.string().optional(),
  })
  .refine((data) => data.individualClientId || data.organizationClientId, {
    message:
      "Either individualClientId or organizationClientId must be provided",
    path: ["clientId"],
  })
  .refine((data) => !(data.individualClientId && data.organizationClientId), {
    message: "Cannot provide both individualClientId and organizationClientId",
    path: ["clientId"],
  });
