/*
  Warnings:

  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CAType" AS ENUM ('AUDIT', 'TAXATION', 'MANAGEMENT', 'FORENSIC', 'COST', 'FINANCIAL');

-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('INDIVIDUAL', 'BUSINESS', 'GOVT_DEPT', 'NGO', 'CHARITY', 'EDUCATIONAL_INSTITUTE', 'HEALTH_CARE_SECTOR');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('PROPRIETORSHIP', 'PARTNERSHIP', 'LLP', 'PVT_LTD', 'PUBLIC_LTD', 'HUF', 'TRUST', 'SOCIETY', 'NGO');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PAN', 'AADHAAR', 'GST_CERT', 'CIN_DOC', 'ITR_ACK', 'FINANCIALS', 'OTHER');

-- CreateEnum
CREATE TYPE "ComplianceType" AS ENUM ('ITR', 'GST', 'TDS', 'ROC', 'ADVANCE_TAX');

-- CreateEnum
CREATE TYPE "ComplianceStatus" AS ENUM ('PENDING', 'FILED', 'OVERDUE');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('SAVINGS', 'CURRENT', 'OD', 'CC');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'ISSUED', 'PAID', 'OVERDUE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('UPI', 'CASH', 'BANK_TRANSFER', 'CARD', 'CHEQUE', 'OTHER');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "clientDetailsId" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ClientDetails" (
    "id" TEXT NOT NULL,
    "type" "ClientType" NOT NULL,
    "panNumber" TEXT NOT NULL,
    "aadhaarNumber" TEXT,
    "passportNumber" TEXT,
    "gstin" TEXT,
    "cin" TEXT,
    "tanNumber" TEXT,
    "msmeNumber" TEXT,
    "iecCode" TEXT,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "permanentAddress" TEXT,
    "officeAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndividualClient" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" "Gender",
    "dob" TIMESTAMP(3) NOT NULL,
    "clientDetailsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IndividualClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationClient" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "entityType" "EntityType" NOT NULL,
    "incorporationDate" TIMESTAMP(3) NOT NULL,
    "clientDetailsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "clientDetailsId" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "accountType" "AccountType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "clientDetailsId" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "url" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplianceRecord" (
    "id" TEXT NOT NULL,
    "clientDetailsId" TEXT NOT NULL,
    "type" "ComplianceType" NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "filedOn" TIMESTAMP(3),
    "status" "ComplianceStatus" NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ComplianceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "clientDetailsId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "taxAmount" DECIMAL(10,2) NOT NULL,
    "grandTotal" DECIMAL(10,2) NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "paymentMethod" "PaymentMethod",
    "paymentDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientDetails_panNumber_key" ON "ClientDetails"("panNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ClientDetails_aadhaarNumber_key" ON "ClientDetails"("aadhaarNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ClientDetails_passportNumber_key" ON "ClientDetails"("passportNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ClientDetails_gstin_key" ON "ClientDetails"("gstin");

-- CreateIndex
CREATE UNIQUE INDEX "ClientDetails_cin_key" ON "ClientDetails"("cin");

-- CreateIndex
CREATE UNIQUE INDEX "ClientDetails_tanNumber_key" ON "ClientDetails"("tanNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ClientDetails_msmeNumber_key" ON "ClientDetails"("msmeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ClientDetails_iecCode_key" ON "ClientDetails"("iecCode");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualClient_clientDetailsId_key" ON "IndividualClient"("clientDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationClient_clientDetailsId_key" ON "OrganizationClient"("clientDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualClient" ADD CONSTRAINT "IndividualClient_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationClient" ADD CONSTRAINT "OrganizationClient_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceRecord" ADD CONSTRAINT "ComplianceRecord_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
