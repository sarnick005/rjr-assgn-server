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

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualClient" ADD CONSTRAINT "IndividualClient_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationClient" ADD CONSTRAINT "OrganizationClient_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceRecord" ADD CONSTRAINT "ComplianceRecord_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientDetailsId_fkey" FOREIGN KEY ("clientDetailsId") REFERENCES "ClientDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
