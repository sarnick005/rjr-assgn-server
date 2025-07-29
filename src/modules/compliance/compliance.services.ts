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
      individualClientId: clientId,
      organizationClientId: clientId,
    },
    include: {
      individualClient: true,
      organizationClient: true,
    },
  });
};

export const getCompliancesByClientService = async (
  clientFilter: GetCompliancesByClientInput
) => {
  return db.complianceRecord.findMany({
    where: {
      OR: [
        { individualClientId: clientFilter.individualClientId },
        { organizationClientId: clientFilter.organizationClientId },
      ],
    },
    include: {
      individualClient: true,
      organizationClient: true,
    },
    orderBy: { dueDate: "asc" },
  });
};

export const getCompliancesByIndividualClientService = async (
  individualClientId: string
) => {
  return db.complianceRecord.findMany({
    where: { individualClientId },
    include: {
      individualClient: true,
      organizationClient: true,
    },
    orderBy: { dueDate: "asc" },
  });
};

export const getCompliancesByOrganizationClientService = async (
  organizationClientId: string
) => {
  return db.complianceRecord.findMany({
    where: { organizationClientId },
    include: {
      individualClient: true,
      organizationClient: true,
    },
    orderBy: { dueDate: "asc" },
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
    include: {
      individualClient: true,
      organizationClient: true,
    },
  });
};
