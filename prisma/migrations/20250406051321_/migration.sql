-- DropForeignKey
ALTER TABLE "CreditRecord" DROP CONSTRAINT "CreditRecord_userId_fkey";

-- AddForeignKey
ALTER TABLE "CreditRecord" ADD CONSTRAINT "CreditRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
