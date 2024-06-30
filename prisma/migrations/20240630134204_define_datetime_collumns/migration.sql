/*
  Warnings:

  - Added the required column `eventDate` to the `ExternalWebhookHotmartReceiver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExternalWebhookHotmartReceiver" ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "creationDate" SET DEFAULT CURRENT_TIMESTAMP;
