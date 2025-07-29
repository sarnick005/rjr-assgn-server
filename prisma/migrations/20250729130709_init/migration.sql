/*
  Warnings:

  - You are about to drop the column `clientDetailsId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `BankAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ComplianceRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IndividualClient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvoiceItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrganizationClient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BankAccount" DROP CONSTRAINT "BankAccount_clientDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "ComplianceRecord" DROP CONSTRAINT "ComplianceRecord_clientDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_clientDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualClient" DROP CONSTRAINT "IndividualClient_clientDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_clientDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceItem" DROP CONSTRAINT "InvoiceItem_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationClient" DROP CONSTRAINT "OrganizationClient_clientDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_clientDetailsId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "clientDetailsId",
ALTER COLUMN "role" SET DEFAULT 'CA';

-- DropTable
DROP TABLE "BankAccount";

-- DropTable
DROP TABLE "ClientDetails";

-- DropTable
DROP TABLE "ComplianceRecord";

-- DropTable
DROP TABLE "Document";

-- DropTable
DROP TABLE "IndividualClient";

-- DropTable
DROP TABLE "Invoice";

-- DropTable
DROP TABLE "InvoiceItem";

-- DropTable
DROP TABLE "OrganizationClient";

-- CreateTable
CREATE TABLE "individual_client_details" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" "Gender",
    "dob" TIMESTAMP(3) NOT NULL,
    "panNumber" TEXT NOT NULL,
    "aadhaarNumber" TEXT,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "permanentAddress" TEXT,
    "officeAddress" TEXT,
    "caId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "individual_client_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_clients" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "entityType" "EntityType" NOT NULL,
    "incorporationDate" TIMESTAMP(3) NOT NULL,
    "panNumber" TEXT NOT NULL,
    "aadhaarNumber" TEXT,
    "gstNumber" TEXT,
    "caId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "accountType" "AccountType" NOT NULL,
    "individualClientId" TEXT,
    "organizationClientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "url" TEXT NOT NULL,
    "individualClientId" TEXT,
    "organizationClientId" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_records" (
    "id" TEXT NOT NULL,
    "type" "ComplianceType" NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "filedOn" TIMESTAMP(3),
    "status" "ComplianceStatus" NOT NULL,
    "remarks" TEXT,
    "individualClientId" TEXT,
    "organizationClientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "compliance_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
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
    "individualClientId" TEXT,
    "organizationClientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_items" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "individual_client_details_panNumber_key" ON "individual_client_details"("panNumber");

-- CreateIndex
CREATE UNIQUE INDEX "individual_client_details_aadhaarNumber_key" ON "individual_client_details"("aadhaarNumber");

-- CreateIndex
CREATE UNIQUE INDEX "organization_clients_panNumber_key" ON "organization_clients"("panNumber");

-- CreateIndex
CREATE UNIQUE INDEX "organization_clients_aadhaarNumber_key" ON "organization_clients"("aadhaarNumber");

-- CreateIndex
CREATE UNIQUE INDEX "organization_clients_gstNumber_key" ON "organization_clients"("gstNumber");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_invoiceNumber_key" ON "invoices"("invoiceNumber");

-- AddForeignKey
ALTER TABLE "individual_client_details" ADD CONSTRAINT "individual_client_details_caId_fkey" FOREIGN KEY ("caId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_clients" ADD CONSTRAINT "organization_clients_caId_fkey" FOREIGN KEY ("caId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_individualClientId_fkey" FOREIGN KEY ("individualClientId") REFERENCES "individual_client_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_organizationClientId_fkey" FOREIGN KEY ("organizationClientId") REFERENCES "organization_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_individualClientId_fkey" FOREIGN KEY ("individualClientId") REFERENCES "individual_client_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_organizationClientId_fkey" FOREIGN KEY ("organizationClientId") REFERENCES "organization_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_records" ADD CONSTRAINT "compliance_records_individualClientId_fkey" FOREIGN KEY ("individualClientId") REFERENCES "individual_client_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_records" ADD CONSTRAINT "compliance_records_organizationClientId_fkey" FOREIGN KEY ("organizationClientId") REFERENCES "organization_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_individualClientId_fkey" FOREIGN KEY ("individualClientId") REFERENCES "individual_client_details"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_organizationClientId_fkey" FOREIGN KEY ("organizationClientId") REFERENCES "organization_clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
