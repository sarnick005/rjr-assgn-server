import { db } from "../../shared/config/db";
import { CreateInvoiceInput } from "./invoice.type";

export const createInvoiceService = async (data: CreateInvoiceInput) => {
  return db.invoice.create({
    data: {
      clientDetailsId: data.clientDetailsId,
      invoiceNumber: data.invoiceNumber,
      dueDate: data.dueDate,
      totalAmount: data.totalAmount,
      taxAmount: data.taxAmount,
      grandTotal: data.grandTotal,
      status: data.status,
      paymentMethod: data.paymentMethod,
      paymentDate: data.paymentDate,
      notes: data.notes,
      items: {
        create: data.items.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          amount: item.amount,
        })),
      },
    },
    include: {
      items: true,
    },
  });
};

export const getInvoicesByClientService = async (clientDetailsId: string) => {
  return db.invoice.findMany({
    where: { clientDetailsId },
    include: { items: true },
  });
};

export const deleteInvoiceService = async (invoiceId: string) => {
  return db.invoice.delete({
    where: { id: invoiceId },
  });
};
