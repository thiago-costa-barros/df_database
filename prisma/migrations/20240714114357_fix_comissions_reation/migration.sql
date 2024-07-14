/*
  Warnings:

  - You are about to drop the column `hotmartOrderNoteId` on the `HotmartComissions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "df_servicesystem"."HotmartComissions" DROP CONSTRAINT "HotmartComissions_hotmartOrderNoteId_fkey";

-- AlterTable
ALTER TABLE "df_servicesystem"."HotmartComissions" DROP COLUMN "hotmartOrderNoteId",
ADD COLUMN     "hotmartPurchaseId" INTEGER;

-- AddForeignKey
ALTER TABLE "df_servicesystem"."HotmartComissions" ADD CONSTRAINT "HotmartComissions_hotmartPurchaseId_fkey" FOREIGN KEY ("hotmartPurchaseId") REFERENCES "df_servicesystem"."HotmartPurchase"("HotmartPurchaseId") ON DELETE SET NULL ON UPDATE CASCADE;
