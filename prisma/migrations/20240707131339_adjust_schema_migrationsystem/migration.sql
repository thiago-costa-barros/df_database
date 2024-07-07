/*
  Warnings:

  - You are about to drop the `externalWebhookHotmartReceiver` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "df_migrationsystem";

-- DropTable
DROP TABLE "df_externalsystem"."externalWebhookHotmartReceiver";

-- CreateTable
CREATE TABLE "df_externalsystem"."ExternalWebhookHotmartReceiver" (
    "ExternalWebhookHotmartReceiverId" SERIAL NOT NULL,
    "RequestId" TEXT NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "EventDate" TIMESTAMP(3) NOT NULL,
    "EventName" TEXT NOT NULL,
    "Version" TEXT NOT NULL,
    "Payload" JSONB NOT NULL,

    CONSTRAINT "ExternalWebhookHotmartReceiver_pkey" PRIMARY KEY ("ExternalWebhookHotmartReceiverId")
);
