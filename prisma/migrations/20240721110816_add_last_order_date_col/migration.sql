-- AlterTable
ALTER TABLE "df_servicesystem"."HotmartBuyer" ADD COLUMN     "HotmartBuyerLastOrderDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "df_servicesystem"."HotmartProduct" ADD COLUMN     "HotmartProductLastOrderDate" TIMESTAMP(3);
