/*
  Warnings:

  - The primary key for the `Guesser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Guesser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `x` on the `Guesser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `y` on the `Guesser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Guesser" DROP CONSTRAINT "Guesser_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "x",
ADD COLUMN     "x" INTEGER NOT NULL,
DROP COLUMN "y",
ADD COLUMN     "y" INTEGER NOT NULL,
ADD CONSTRAINT "Guesser_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Guesser_id_key" ON "Guesser"("id");
