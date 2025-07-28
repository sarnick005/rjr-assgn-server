import { db } from "../../shared/config/db";
import { ApiError } from "../../shared/utils";
import {
  GeneralDetailsBody,
  IndividualDetailsBody,
  OrganizationDetailsBody,
} from "./client.type";

// COMMON
export const updateGeneralDetailsService = async (
  data: GeneralDetailsBody,
  clientId: string
) => {
  const {
    type,
    panNumber,
    aadhaarNumber,
    gstin,
    contactEmail,
    contactPhone,
    presentAddress,
    permanentAddress,
    officeAddress,
  } = data;

  const response = await db.clientDetails.update({
    where: {
      id: clientId,
    },
    data: {
      type,
      panNumber,
      aadhaarNumber,
      gstin,
      contactEmail,
      contactPhone,
      presentAddress,
      permanentAddress,
      officeAddress,
    },
  });

  return response;
};

export const getClientDetailsById = async (clientId: string) => {
  return await db.clientDetails.findUnique({
    where: { id: clientId },
  });
};

// INDIVIDUAL
export const createIndividualDetailsService = async (
  data: IndividualDetailsBody,
  clientDetailsId: string
) => {
  const { fullName, gender, dob } = data;

  const response = await db.individualClient.create({
    data: {
      fullName,
      gender,
      dob,
      clientDetailsId,
    },
  });

  return response;
};

export const updateIndividualDetailsService = async (
  data: IndividualDetailsBody,
  clientId: string
) => {
  const { fullName, gender, dob } = data;
  const response = await db.individualClient.update({
    where: { id: clientId },
    data: { fullName, gender, dob },
  });
  return response;
};
export const getIndividualClientDetailsById = async (clientId: string) => {
  return await db.individualClient.findUnique({
    where: { id: clientId },
  });
};
export const deleteIndividualDetailsService = async (
  clientDetailsId: string
) => {
  const existing = await db.clientDetails.findUnique({
    where: { id: clientDetailsId },
  });

  if (!existing) {
    throw new ApiError(404, "ClientDetails not found");
  }

  const deleted = await db.clientDetails.delete({
    where: { id: clientDetailsId },
  });

  return deleted;
};


// ORGANIZATION
export const createOrganizationService = async (
  data: OrganizationDetailsBody ,clientDetailsId: string 
) => {
  const { businessName, entityType, incorporationDate } = data;

  const response = await db.organizationClient.create({
    data: {
      businessName,
      entityType,
      incorporationDate,
      clientDetailsId,
    },
  });

  return response;
};

export const updateOrganizationDetailsService = async (
  data: OrganizationDetailsBody,
  clientId: string
) => {
  const { businessName, entityType, incorporationDate } = data;
  const response = await db.organizationClient.update({
    where: { id: clientId },
    data: { businessName, entityType, incorporationDate },
  });
  return response;
};
export const getOrganizationDetailsById = async (clientId: string) => {
  return await db.organizationClient.findUnique({
    where: { id: clientId },
  });
};
export const deleteOrganizationService = async (clientDetailsId: string) => {
  const existing = await db.clientDetails.findUnique({
    where: { id: clientDetailsId },
  });

  if (!existing) {
    throw new ApiError(404, "ClientDetails not found");
  }

  const deleted = await db.clientDetails.delete({
    where: { id: clientDetailsId },
  });

  return deleted;
};
