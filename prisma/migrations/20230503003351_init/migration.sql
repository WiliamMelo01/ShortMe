/*
  Warnings:

  - Added the required column `expirationDate` to the `URI` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_URI" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "linkToRedirect" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "shortnedLink" TEXT NOT NULL,
    "expirationDate" DATETIME NOT NULL
);
INSERT INTO "new_URI" ("hash", "id", "linkToRedirect", "shortnedLink") SELECT "hash", "id", "linkToRedirect", "shortnedLink" FROM "URI";
DROP TABLE "URI";
ALTER TABLE "new_URI" RENAME TO "URI";
CREATE UNIQUE INDEX "URI_hash_key" ON "URI"("hash");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
