import { z } from "zod";

export const createComplianceSchema = z.object({
  clientDetailsId: z.string(),
  type: z.enum(["ITR", "GST", "TDS", "ROC", "ADVANCE_TAX"]),
  dueDate: z.coerce.date(),
  filedOn: z.coerce.date().optional(),
  status: z.enum(["PENDING", "FILED", "OVERDUE"]),
  remarks: z.string().optional(),
});
