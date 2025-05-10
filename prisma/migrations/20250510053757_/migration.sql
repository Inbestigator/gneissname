/*
  Warnings:

  - You are about to drop the `TriviaResponse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TriviaSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TriviaResponse" DROP CONSTRAINT "TriviaResponse_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "TriviaSession" DROP CONSTRAINT "TriviaSession_triviaId_fkey";

-- DropTable
DROP TABLE "TriviaResponse";

-- DropTable
DROP TABLE "TriviaSession";
