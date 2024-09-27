-- CreateTable
CREATE TABLE "Trivia" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,

    CONSTRAINT "Trivia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "triviaId" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "emoji" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guesser" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "x" TEXT NOT NULL,
    "y" TEXT NOT NULL,

    CONSTRAINT "Guesser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trivia_id_key" ON "Trivia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Trivia_question_key" ON "Trivia"("question");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_id_key" ON "Answer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Guesser_id_key" ON "Guesser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Guesser_image_key" ON "Guesser"("image");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_triviaId_fkey" FOREIGN KEY ("triviaId") REFERENCES "Trivia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
