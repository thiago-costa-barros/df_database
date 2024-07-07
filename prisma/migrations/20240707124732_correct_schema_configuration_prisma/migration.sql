/*
  Warnings:

  - You are about to drop the `df_externalsystem.externalWebhookHotmartReceiver` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "df_externalsystem";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "df_servicesystem";

-- DropTable
DROP TABLE "public"."df_externalsystem.externalWebhookHotmartReceiver";

-- CreateTable
CREATE TABLE "df_externalsystem"."externalWebhookHotmartReceiver" (
    "id" SERIAL NOT NULL,
    "externalWebhookHotmartReceiverId" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "event" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "externalWebhookHotmartReceiver_pkey" PRIMARY KEY ("id")
);
