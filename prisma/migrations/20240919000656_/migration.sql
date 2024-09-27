-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_triviaId_fkey";

-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "emoji" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_triviaId_fkey" FOREIGN KEY ("triviaId") REFERENCES "Trivia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
