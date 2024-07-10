/*
  Warnings:

  - A unique constraint covering the columns `[RequestId]` on the table `ExternalWebhookHotmartReceiver` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExternalWebhookHotmartReceiver_RequestId_key" ON "df_externalsystem"."ExternalWebhookHotmartReceiver"("RequestId");
