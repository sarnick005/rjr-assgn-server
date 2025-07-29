import { db } from "../../shared/config/db";
import {
  CreateComplianceInput,
  GetCompliancesByClientInput,
} from "./compliance.type";

export const createComplianceService = async (
  data: CreateComplianceInput,
  clientId: string
) => {
  return db.complianceRecord.create({
    data: {
      type: data.type,
      dueDate: data.dueDate,
      filedOn: data.filedOn,
      status: data.status,
      remarks: data.remarks,
    },
  });
};

export const deleteComplianceService = async (complianceId: string) => {
  return db.complianceRecord.delete({
    where: { id: complianceId },
  });
};

export const updateComplianceService = async (
  complianceId: string,
  data: Partial<CreateComplianceInput>
) => {
  return db.complianceRecord.update({
    where: { id: complianceId },
    data: {
      type: data.type,
      dueDate: data.dueDate,
      filedOn: data.filedOn,
      status: data.status,
      remarks: data.remarks,
    },
  });
};
