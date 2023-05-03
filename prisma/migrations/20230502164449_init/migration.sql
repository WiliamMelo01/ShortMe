/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `URI` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "URI_hash_key" ON "URI"("hash");
