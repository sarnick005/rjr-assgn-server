import { z } from "zod";

export const invoiceItemSchema = z.object({
  description: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
  amount: z.number().positive(),
});

export const createInvoiceSchema = z
  .object({
    invoiceNumber: z.string(),
    dueDate: z.coerce.date(),
    items: z.array(invoiceItemSchema),
    totalAmount: z.number(),
    taxAmount: z.number(),
    grandTotal: z.number(),
    status: z.enum(["PAID", "CANCELLED", "OVERDUE", "DRAFT", "ISSUED"]),
    paymentMethod: z
      .enum(["CASH", "BANK_TRANSFER", "UPI", "CARD", "CHEQUE", "OTHER"])
      .optional(),
    paymentDate: z.coerce.date().optional(),
    notes: z.string().optional(),
  })
