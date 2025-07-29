/*
  Warnings:

  - You are about to drop the column `individualClientId` on the `compliance_records` table. All the data in the column will be lost.
  - You are about to drop the column `organizationClientId` on the `compliance_records` table. All the data in the column will be lost.
  - You are about to drop the column `individualClientId` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `organizationClientId` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `individualClientId` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `organizationClientId` on the `invoices` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "compliance_records" DROP CONSTRAINT "compliance_records_individualClientId_fkey";

-- DropForeignKey
ALTER TABLE "compliance_records" DROP CONSTRAINT "compliance_records_organizationClientId_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_individualClientId_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_organizationClientId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_individualClientId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_organizationClientId_fkey";

-- AlterTable
ALTER TABLE "compliance_records" DROP COLUMN "individualClientId",
DROP COLUMN "organizationClientId";

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "individualClientId",
DROP COLUMN "organizationClientId",
ADD COLUMN     "clientId" TEXT;

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "individualClientId",
DROP COLUMN "organizationClientId";
