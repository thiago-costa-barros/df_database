/*
  Warnings:

  - You are about to drop the column `HotmartComissionsCurrencyConvertion` on the `HotmartComissions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "df_externalsystem"."ExternalWebhookHotmartReceiver_RequestId_key";

-- AlterTable
ALTER TABLE "df_servicesystem"."HotmartComissions" DROP COLUMN "HotmartComissionsCurrencyConvertion",
ADD COLUMN     "HotmartComissionsCurrencyConvertionRate" DECIMAL(65,30),
ADD COLUMN     "HotmartComissionsCurrencyValue" TEXT;

-- AlterTable
ALTER TABLE "df_servicesystem"."HotmartSubscription" ADD COLUMN     "HotmartSubscriberStatus" TEXT;
