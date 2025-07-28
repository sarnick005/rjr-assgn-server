import { db } from "../../shared/config/db";
import { CreateComplianceInput } from "./compliance.type";

export const createComplianceService = async (data: CreateComplianceInput) => {
  return db.complianceRecord.create({
    data: {
      clientDetailsId: data.clientDetailsId,
      type: data.type,
      dueDate: data.dueDate,
      filedOn: data.filedOn,
      status: data.status,
      remarks: data.remarks,
    },
  });
};

export const getCompliancesByClientService = async (
  clientDetailsId: string
) => {
  return db.complianceRecord.findMany({
    where: { clientDetailsId },
  });
};

export const deleteComplianceService = async (complianceId: string) => {
  return db.complianceRecord.delete({
    where: { id: complianceId },
  });
};
