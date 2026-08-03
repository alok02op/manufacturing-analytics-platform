/*
  Warnings:

  - A unique constraint covering the columns `[factoryId,code]` on the table `ProductionLine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `ProductionLine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProductionLine` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductionLineStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE');

-- AlterTable
ALTER TABLE "ProductionLine" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "status" "ProductionLineStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "ProductionLine_factoryId_idx" ON "ProductionLine"("factoryId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionLine_factoryId_code_key" ON "ProductionLine"("factoryId", "code");
