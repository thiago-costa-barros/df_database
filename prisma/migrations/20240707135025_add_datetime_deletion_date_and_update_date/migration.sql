/*
  Warnings:

  - Added the required column `UpdateDate` to the `ExternalWebhookHotmartReceiver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "df_externalsystem"."ExternalWebhookHotmartReceiver" ADD COLUMN     "DeletionDate" TIMESTAMP(3),
ADD COLUMN     "UpdateDate" TIMESTAMP(3) NOT NULL;
