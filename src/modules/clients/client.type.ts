import { z } from "zod";
import { individualClientSchema, orgSchema } from "./client.schema";

//INDIVIDUAL
export type IndividualClientBody = z.infer<typeof individualClientSchema>;

// ORG
export type OrgBody = z.infer<typeof orgSchema>;
