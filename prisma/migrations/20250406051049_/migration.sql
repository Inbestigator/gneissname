/*
  Warnings:

  - You are about to drop the `Tracking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tracking" DROP CONSTRAINT "Tracking_userId_fkey";

-- DropTable
DROP TABLE "Tracking";
