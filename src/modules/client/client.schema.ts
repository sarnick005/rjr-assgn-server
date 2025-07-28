import { z } from "zod";

export const generalDetailsSchema = z.object({
  type: z.enum([
    "INDIVIDUAL",
    "BUSINESS",
    "GOVT_DEPT",
    "NGO",
    "CHARITY",
    "EDUCATIONAL_INSTITUTE",
    "HEALTH_CARE_SECTOR",
  ]),
  panNumber: z
    .string()
    .trim()
    .length(10, { message: "PAN must be exactly 10 characters" })
    .regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, { message: "Invalid PAN format" }),
  aadhaarNumber: z
    .string()
    .trim()
    .length(12, { message: "Aadhaar must be 12 digits" })
    .regex(/^\d{12}$/, { message: "Aadhaar must be numeric" })
    .optional(),
  gstin: z
    .string()
    .trim()
    .length(15, { message: "GSTIN must be 15 characters" })
    .regex(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, {
      message: "Invalid GSTIN format",
    })
    .optional(),
  contactEmail: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(50, { message: "Email must be under 50 characters" }),
  contactPhone: z
    .string()
    .trim()
    .length(10, { message: "Phone must be 10 digits" })
    .regex(/^[6-9]\d{9}$/, { message: "Invalid Indian phone number" }),
  presentAddress: z.string().trim().max(200, { message: "Max 200 characters" }),
  permanentAddress: z
    .string()
    .trim()
    .max(200, { message: "Max 200 characters" })
    .optional(),
  officeAddress: z
    .string()
    .trim()
    .max(200, { message: "Max 200 characters" })
    .optional(),
});

export const individualClientSchema = z.object({
  fullName: z.string().trim(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  dob: z
    .union([z.string(), z.date()])
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), { message: "Invalid date" }),
});

export const organizationClientSchema = z.object({
  businessName: z.string().trim(),
  entityType: z.enum([
    "PROPRIETORSHIP",
    "PARTNERSHIP",
    "LLP",
    "PVT_LTD",
    "PUBLIC_LTD",
    "HUF",
    "TRUST",
    "SOCIETY",
    "NGO",
  ]),
  incorporationDate: z
    .union([z.string(), z.date()])
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), { message: "Invalid date" }),
});
