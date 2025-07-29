import { db } from "../../shared/config/db";
import { IndividualClientBody, OrgBody } from "./client.type";
import { ApiError } from "../../shared/utils";

interface PaginationOptions {
  page: number;
  limit: number;
  search?: string;
}

export class IndividualClientServices {
  static async create(data: IndividualClientBody, userId: string) {
    const {
      fullName,
      gender,
      dob,
      panNumber,
      aadhaarNumber,
      contactEmail,
      contactPhone,
      presentAddress,
      permanentAddress,
      officeAddress,
    } = data;
    const existingClient = await db.individualClientDetails.findFirst({
      where: {
        OR: [{ panNumber }, { aadhaarNumber }, { contactEmail }],
      },
    });

    if (existingClient) {
      throw new ApiError(
        409,
        "CLIENT WITH SAME PAN, AADHAAR, OR EMAIL ALREADY EXISTS"
      );
    }

    const newClient = await db.individualClientDetails.create({
      data: {
        fullName,
        gender,
        dob,
        panNumber,
        aadhaarNumber,
        contactEmail,
        contactPhone,
        presentAddress,
        permanentAddress,
        officeAddress,
        caId: userId,
      },
    });

    return newClient;
  }

  static async update(id: string, data: Partial<IndividualClientBody>) {
    const existingClient = await db.individualClientDetails.findUnique({
      where: { id },
    });

    if (!existingClient) {
      throw new ApiError(404, "INDIVIDUAL CLIENT NOT FOUND");
    }
    if (data.panNumber || data.aadhaarNumber || data.contactEmail) {
      const conflictingClient = await db.individualClientDetails.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [
                data.panNumber ? { panNumber: data.panNumber } : {},
                data.aadhaarNumber ? { aadhaarNumber: data.aadhaarNumber } : {},
                data.contactEmail ? { contactEmail: data.contactEmail } : {},
              ],
            },
          ],
        },
      });

      if (conflictingClient) {
        throw new ApiError(
          409,
          "CLIENT WITH SAME PAN, AADHAAR, OR EMAIL ALREADY EXISTS"
        );
      }
    }

    const updatedClient = await db.individualClientDetails.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return updatedClient;
  }

  static async getById(id: string) {
    const client = await db.individualClientDetails.findUnique({
      where: { id },
    });

    return client;
  }

  static async getAll(options: PaginationOptions) {
    const { page, limit, search } = options;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { fullName: { contains: search, mode: "insensitive" as const } },
            {
              contactEmail: { contains: search, mode: "insensitive" as const },
            },
            { panNumber: { contains: search, mode: "insensitive" as const } },
            {
              contactPhone: { contains: search, mode: "insensitive" as const },
            },
          ],
        }
      : {};

    const [clients, total] = await Promise.all([
      db.individualClientDetails.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.individualClientDetails.count({ where }),
    ]);

    return {
      clients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  static async delete(id: string) {
    const existingClient = await db.individualClientDetails.findUnique({
      where: { id },
    });

    if (!existingClient) {
      throw new ApiError(404, "INDIVIDUAL CLIENT NOT FOUND");
    }

    await db.individualClientDetails.delete({
      where: { id },
    });

    return true;
  }
}

export class OrgServices {
  static async create(data: OrgBody, userId: string) {
    const {
      businessName,
      entityType,
      incorporationDate,
      panNumber,
      aadhaarNumber,
      gstNumber,
    } = data;
    const existingOrg = await db.organizationClient.findFirst({
      where: {
        OR: [
          { panNumber },
          { gstNumber },
          { businessName: { equals: businessName, mode: "insensitive" } },
        ],
      },
    });

    if (existingOrg) {
      throw new ApiError(
        409,
        "ORGANIZATION WITH SAME PAN, GST, OR BUSINESS NAME ALREADY EXISTS"
      );
    }

    const newClient = await db.organizationClient.create({
      data: {
        businessName,
        entityType,
        incorporationDate,
        panNumber,
        aadhaarNumber,
        gstNumber,
        caId:userId
      },
    });

    return newClient;
  }

  static async update(id: string, data: Partial<OrgBody>) {
    const existingOrg = await db.organizationClient.findUnique({
      where: { id },
    });

    if (!existingOrg) {
      throw new ApiError(404, "ORGANIZATION CLIENT NOT FOUND");
    }
    if (data.panNumber || data.gstNumber || data.businessName) {
      const conflictingOrg = await db.organizationClient.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [
                data.panNumber ? { panNumber: data.panNumber } : {},
                data.gstNumber ? { gstNumber: data.gstNumber } : {},
                data.businessName
                  ? {
                      businessName: {
                        equals: data.businessName,
                        mode: "insensitive",
                      },
                    }
                  : {},
              ],
            },
          ],
        },
      });

      if (conflictingOrg) {
        throw new ApiError(
          409,
          "ORGANIZATION WITH SAME PAN, GST, OR BUSINESS NAME ALREADY EXISTS"
        );
      }
    }

    const updatedOrg = await db.organizationClient.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return updatedOrg;
  }

  static async getById(id: string) {
    const org = await db.organizationClient.findUnique({
      where: { id },
    });

    return org;
  }

  static async getAll(options: PaginationOptions) {
    const { page, limit, search } = options;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            {
              businessName: { contains: search, mode: "insensitive" as const },
            },
            { panNumber: { contains: search, mode: "insensitive" as const } },
            { gstNumber: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [organizations, total] = await Promise.all([
      db.organizationClient.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.organizationClient.count({ where }),
    ]);

    return {
      organizations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  static async delete(id: string) {
    const existingOrg = await db.organizationClient.findUnique({
      where: { id },
    });

    if (!existingOrg) {
      throw new ApiError(404, "ORGANIZATION CLIENT NOT FOUND");
    }

    await db.organizationClient.delete({
      where: { id },
    });

    return true;
  }
}
