/*
  Warnings:

  - The `HotmartPaymentInfosPixExpirationDate` column on the `HotmartPaymentInfos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "df_servicesystem"."HotmartPaymentInfos" DROP COLUMN "HotmartPaymentInfosPixExpirationDate",
ADD COLUMN     "HotmartPaymentInfosPixExpirationDate" TIMESTAMP(3);
