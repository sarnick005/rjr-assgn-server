import { db } from "../../shared/config/db";
import { CreateInvoiceInput } from "./invoice.type";

export const createInvoiceService = async (
  data: CreateInvoiceInput,
  clientId: string
) => {
  return db.invoice.create({
    data: {
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


export const updateInvoiceService = async (
  invoiceId: string,
  data: Partial<CreateInvoiceInput>
) => {
  const updateData: any = {
    invoiceNumber: data.invoiceNumber,
    dueDate: data.dueDate,
    totalAmount: data.totalAmount,
    taxAmount: data.taxAmount,
    grandTotal: data.grandTotal,
    status: data.status,
    paymentMethod: data.paymentMethod,
    paymentDate: data.paymentDate,
    notes: data.notes,
  };

  if (data.items) {
    await db.invoiceItem.deleteMany({
      where: { invoiceId },
    });
    updateData.items = {
      create: data.items.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        amount: item.amount,
      })),
    };
  }

  return db.invoice.update({
    where: { id: invoiceId },
    data: updateData,
    include: {
      items: true,
        },
  });
};

export const deleteInvoiceService = async (invoiceId: string) => {
  return db.invoice.delete({
    where: { id: invoiceId },
  });
};
