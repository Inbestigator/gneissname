/*
  Warnings:

  - You are about to drop the column `optedOut` on the `CreditRecord` table. All the data in the column will be lost.
  - The primary key for the `Trivia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Trivia` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `triviaId` on the `Answer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_triviaId_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "triviaId",
ADD COLUMN     "triviaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CreditRecord" DROP COLUMN "optedOut";

-- AlterTable
ALTER TABLE "Trivia" DROP CONSTRAINT "Trivia_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Trivia_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "optedOut" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Trivia_id_key" ON "Trivia"("id");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_triviaId_fkey" FOREIGN KEY ("triviaId") REFERENCES "Trivia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
