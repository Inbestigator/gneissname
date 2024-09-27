/*
  Warnings:

  - You are about to drop the column `y` on the `Guesser` table. All the data in the column will be lost.
  - Added the required column `z` to the `Guesser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guesser" DROP COLUMN "y",
ADD COLUMN     "z" INTEGER NOT NULL;
