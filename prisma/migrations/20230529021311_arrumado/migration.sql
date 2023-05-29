-- CreateTable
CREATE TABLE "url" (
    "id" TEXT NOT NULL,
    "linkToRedirect" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "shortnedLink" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "url_hash_key" ON "url"("hash");
