/*
  Warnings:

  - Added the required column `messageId` to the `TriviaSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TriviaSession" ADD COLUMN     "messageId" TEXT NOT NULL;
