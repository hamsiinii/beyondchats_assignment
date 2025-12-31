-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publishedDate" TIMESTAMP(3) NOT NULL,
    "isRewritten" BOOLEAN NOT NULL DEFAULT false,
    "originalId" TEXT,
    "references" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_url_key" ON "Article"("url");

-- CreateIndex
CREATE INDEX "Article_publishedDate_idx" ON "Article"("publishedDate");

-- CreateIndex
CREATE INDEX "Article_isRewritten_idx" ON "Article"("isRewritten");
