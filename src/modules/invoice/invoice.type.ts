import { z } from "zod";
import { createInvoiceSchema } from "./invoice.schema";

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
