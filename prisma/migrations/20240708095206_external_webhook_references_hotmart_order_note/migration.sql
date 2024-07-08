/*
  Warnings:

  - You are about to drop the column `RequestId` on the `HotmartOrderNote` table. All the data in the column will be lost.
  - Added the required column `ExternalWebhookHotmartReceiverId` to the `HotmartOrderNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "df_servicesystem"."HotmartOrderNote" DROP COLUMN "RequestId",
ADD COLUMN     "ExternalWebhookHotmartReceiverId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "df_servicesystem"."HotmartOrderNote" ADD CONSTRAINT "HotmartOrderNote_ExternalWebhookHotmartReceiverId_fkey" FOREIGN KEY ("ExternalWebhookHotmartReceiverId") REFERENCES "df_externalsystem"."ExternalWebhookHotmartReceiver"("ExternalWebhookHotmartReceiverId") ON DELETE RESTRICT ON UPDATE CASCADE;
