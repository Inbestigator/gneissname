-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "credit" INTEGER NOT NULL,
    "optedOut" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "change" INTEGER NOT NULL,
    "currentBalance" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trivia" (
    "question" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Trivia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TriviaSession" (
    "id" TEXT NOT NULL,
    "triviaId" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TriviaSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TriviaResponse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "TriviaResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "emoji" TEXT,
    "text" TEXT NOT NULL,
    "triviaId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CreditRecord_id_key" ON "CreditRecord"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tracking_id_key" ON "Tracking"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Trivia_question_key" ON "Trivia"("question");

-- CreateIndex
CREATE UNIQUE INDEX "Trivia_id_key" ON "Trivia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TriviaSession_id_key" ON "TriviaSession"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TriviaResponse_id_key" ON "TriviaResponse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_id_key" ON "Answer"("id");

-- AddForeignKey
ALTER TABLE "CreditRecord" ADD CONSTRAINT "CreditRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracking" ADD CONSTRAINT "Tracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriviaSession" ADD CONSTRAINT "TriviaSession_triviaId_fkey" FOREIGN KEY ("triviaId") REFERENCES "Trivia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TriviaResponse" ADD CONSTRAINT "TriviaResponse_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TriviaSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_triviaId_fkey" FOREIGN KEY ("triviaId") REFERENCES "Trivia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

