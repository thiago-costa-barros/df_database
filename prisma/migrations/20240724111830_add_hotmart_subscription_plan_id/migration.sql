-- AlterTable
CREATE SEQUENCE "df_servicesystem".hotmartsubscription_hotmartsubscriptionid_seq;
ALTER TABLE "df_servicesystem"."HotmartSubscription" ADD COLUMN     "HotmartSubscriptionPlanId" INTEGER,
ALTER COLUMN "HotmartSubscriptionId" SET DEFAULT nextval('"df_servicesystem".hotmartsubscription_hotmartsubscriptionid_seq');
ALTER SEQUENCE "df_servicesystem".hotmartsubscription_hotmartsubscriptionid_seq OWNED BY "df_servicesystem"."HotmartSubscription"."HotmartSubscriptionId";
