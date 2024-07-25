/*
  Warnings:

  - You are about to drop the `HotmartComissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "df_servicesystem"."HotmartComissions" DROP CONSTRAINT "HotmartComissions_hotmartPurchaseId_fkey";

-- DropTable
DROP TABLE "df_servicesystem"."HotmartComissions";

-- CreateTable
CREATE TABLE "df_servicesystem"."HotmartCommissions" (
    "HotmartCommissionsId" SERIAL NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP(3) NOT NULL,
    "DeletionDate" TIMESTAMP(3),
    "HotmartCommissionsSourceName" TEXT,
    "HotmartCommissionsValue" DECIMAL(65,30),
    "HotmartCommissionsCurrencyValue" TEXT,
    "HotmartCommissionsConvertedToCurrency" TEXT,
    "HotmartCommissionsConvertedValue" DECIMAL(65,30),
    "HotmartCommissionsCurrencyConvertionRate" DECIMAL(65,30),
    "hotmartPurchaseId" INTEGER,

    CONSTRAINT "HotmartCommissions_pkey" PRIMARY KEY ("HotmartCommissionsId")
);

-- AddForeignKey
ALTER TABLE "df_servicesystem"."HotmartCommissions" ADD CONSTRAINT "HotmartCommissions_hotmartPurchaseId_fkey" FOREIGN KEY ("hotmartPurchaseId") REFERENCES "df_servicesystem"."HotmartPurchase"("HotmartPurchaseId") ON DELETE SET NULL ON UPDATE CASCADE;
