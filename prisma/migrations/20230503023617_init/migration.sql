-- CreateTable
CREATE TABLE "URL" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "linkToRedirect" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "shortnedLink" TEXT NOT NULL,
    "expirationDate" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "URL_hash_key" ON "URL"("hash");
