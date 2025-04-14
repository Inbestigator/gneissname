/*
  Warnings:

  - Added the required column `channelId` to the `TriviaSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TriviaSession" ADD COLUMN     "channelId" TEXT NOT NULL;
