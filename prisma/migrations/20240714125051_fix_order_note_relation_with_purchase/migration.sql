/*
  Warnings:

  - You are about to drop the column `HotmartPurchaseTransActionId` on the `HotmartOrderNote` table. All the data in the column will be lost.
  - Added the required column `HotmartPurchaseId` to the `HotmartOrderNote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "df_servicesystem"."HotmartOrderNote" DROP CONSTRAINT "HotmartOrderNote_HotmartPurchaseTransActionId_fkey";

-- AlterTable
ALTER TABLE "df_servicesystem"."HotmartOrderNote" DROP COLUMN "HotmartPurchaseTransActionId",
ADD COLUMN     "HotmartPurchaseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "df_servicesystem"."HotmartOrderNote" ADD CONSTRAINT "HotmartOrderNote_HotmartPurchaseId_fkey" FOREIGN KEY ("HotmartPurchaseId") REFERENCES "df_servicesystem"."HotmartPurchase"("HotmartPurchaseId") ON DELETE RESTRICT ON UPDATE CASCADE;
