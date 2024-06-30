/*
  Warnings:

  - You are about to drop the `TestUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TestUser";

-- CreateTable
CREATE TABLE "external_webhook_hotmart_receiver" (
    "id" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "event" TEXT,
    "version" TEXT,
    "productId" INTEGER,
    "productUcode" TEXT,
    "productName" TEXT,
    "productHasCoProduction" BOOLEAN,
    "affiliateCode" TEXT,
    "affiliateName" TEXT,
    "buyerEmail" TEXT,
    "buyerName" TEXT,
    "buyerCheckoutPhone" TEXT,
    "buyerZipcode" TEXT,
    "buyerCountry" TEXT,
    "buyerNumber" TEXT,
    "buyerAddress" TEXT,
    "buyerCity" TEXT,
    "buyerState" TEXT,
    "buyerNeighborhood" TEXT,
    "buyerComplement" TEXT,
    "buyerCountryIso" TEXT,
    "producerName" TEXT,
    "commissionValue1" DOUBLE PRECISION,
    "commissionCurrencyValue1" TEXT,
    "commissionSource1" TEXT,
    "purchaseApprovedDate" TIMESTAMP(3),
    "purchaseFullPriceValue" DOUBLE PRECISION,
    "purchaseFullPriceCurrencyValue" TEXT,
    "purchaseOriginalOfferPriceCurrencyValue" TEXT,
    "purchaseOriginalOfferPriceValue" DOUBLE PRECISION,
    "purchasePriceValue" DOUBLE PRECISION,
    "purchasePriceCurrencyValue" TEXT,
    "purchaseOfferCode" TEXT,
    "purchaseRecurrenceNumber" INTEGER,
    "purchaseSubscriptionAnticipationPurchase" BOOLEAN,
    "purchaseCheckoutCountryName" TEXT,
    "purchaseCheckoutCountryIso" TEXT,
    "purchaseOriginXcod" TEXT,
    "purchaseOrderBumpIsOrderBump" BOOLEAN,
    "purchaseOrderBumpParentPurchaseTransaction" TEXT,
    "purchaseOrderDate" TEXT,
    "purchaseDateNextCharge" TIMESTAMP(3),
    "purchaseStatus" TEXT,
    "purchaseTransaction" TEXT,
    "paymentBilletBarcode" TEXT,
    "paymentBilletUrl" TEXT,
    "paymentInstallmentsNumber" INTEGER,
    "paymentPixCode" TEXT,
    "paymentPixExpirationDate" TIMESTAMP(3),
    "paymentPixQrCode" TEXT,
    "paymentRefusalReason" TEXT,
    "paymentType" TEXT,
    "subscriptionStatus" TEXT,
    "subscriptionPlanId" INTEGER,
    "subscriptionPlanName" TEXT,
    "subscriptionSubscriberCode" TEXT,

    CONSTRAINT "external_webhook_hotmart_receiver_pkey" PRIMARY KEY ("id")
);
