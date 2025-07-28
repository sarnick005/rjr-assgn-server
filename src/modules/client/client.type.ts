import { z } from "zod";
import {
  generalDetailsSchema,
  individualClientSchema,
  organizationClientSchema,
} from "./client.schema";

export type GeneralDetailsBody = z.infer<typeof generalDetailsSchema>;
export type IndividualDetailsBody = z.infer<typeof individualClientSchema>;
export type OrganizationDetailsBody = z.infer<typeof organizationClientSchema>;
