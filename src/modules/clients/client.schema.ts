import { z } from "zod";

//INDIVIDUAL
export const individualClientSchema = z.object({
  fullName: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Invalid date format (YYYY-MM-DD)",
    })
    .transform((val) => new Date(val)),

  panNumber: z
    .string()
    .trim()
    .length(10, { message: "PAN must be exactly 10 characters" })
    .regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, { message: "Invalid PAN format" }),
  aadhaarNumber: z
    .string()
    .trim()
    .length(12, { message: "Aadhaar must be 12 digits" })
    .regex(/^\d{12}$/, { message: "Aadhaar must be numeric" }),
  contactEmail: z
    .email({ message: "Invalid email address" })
    .trim()
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

// ORG

export const orgSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(1, { message: "Business name is required" }),

  entityType: z.enum(
    [
      "PROPRIETORSHIP",
      "PARTNERSHIP",
      "LLP",
      "PVT_LTD",
      "PUBLIC_LTD",
      "HUF",
      "TRUST",
      "SOCIETY",
      "NGO",
    ],
    { message: "Invalid entity type" }
  ),

  incorporationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Invalid date format (YYYY-MM-DD)",
    })
    .transform((val) => new Date(val)),

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

  gstNumber: z
    .string()
    .trim()
    .regex(/^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})$/, {
      message: "Invalid GST format",
    })
    .optional(),
});
