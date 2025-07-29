import { z } from "zod";
import { createComplianceSchema } from "./compliance.schema";

export type CreateComplianceInput = z.infer<typeof createComplianceSchema>;

export type GetCompliancesByClientInput = {
  individualClientId?: string;
  organizationClientId?: string;
};
