/*
  Warnings:

  - Made the column `emoji` on table `Answer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "emoji" SET NOT NULL;
