/*
  Warnings:

  - You are about to drop the `ExternalWebhookHotmartReceiver` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ExternalWebhookHotmartReceiver";

-- CreateTable
CREATE TABLE "df_externalsystem.externalWebhookHotmartReceiver" (
    "id" SERIAL NOT NULL,
    "externalWebhookHotmartReceiverId" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "event" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "df_externalsystem.externalWebhookHotmartReceiver_pkey" PRIMARY KEY ("id")
);
