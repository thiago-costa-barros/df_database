-- CreateTable
CREATE TABLE "df_servicesystem"."HotmartOrderNote" (
    "HotmartOrderNoteId" SERIAL NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP(3) NOT NULL,
    "DeletionDate" TIMESTAMP(3),
    "RequestId" TEXT NOT NULL,
    "HotmartProductId" INTEGER NOT NULL,
    "HotmartBuyerId" INTEGER NOT NULL,
    "HotmartProducerName" TEXT,
    "HotmartPurchaseTransActionId" TEXT NOT NULL,
    "HotmartSubscriptionId" INTEGER,

    CONSTRAINT "HotmartOrderNote_pkey" PRIMARY KEY ("HotmartOrderNoteId")
);

-- CreateTable
CREATE TABLE "df_servicesystem"."HotmartProduct" (
    "HotmartProductId" INTEGER NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP(3) NOT NULL,
    "DeletionDate" TIMESTAMP(3),
    "HotmartProductUcode" TEXT NOT NULL,
    "HotmartProductName" TEXT NOT NULL,
    "HotmartProductHasCoProduction" BOOLEAN NOT NULL,

    CONSTRAINT "HotmartProduct_pkey" PRIMARY KEY ("HotmartProductId")
);

-- CreateTable
CREATE TABLE "df_servicesystem"."HotmartAffiliates" (
    "HotmartAffiliatesId" SERIAL NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP(3) NOT NULL,
    "DeletionDate" TIMESTAMP(3),
    "HotmartAffiliateCode" TEXT,
    "HotmartAffiliateName" TEXT,
    "hotmartOrderNoteId" INTEGER,

    CONSTRAINT "HotmartAffiliates_pkey" PRIMARY KEY ("HotmartAffiliatesId")
);

-- CreateTable
CREATE TABLE "df_servicesystem"."HotmartBuyer" (
    "HotmartBuyerId" SERIAL NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP(3) NOT NULL,
    "DeletionDate" TIMESTAMP(3),
    "HotmartBuyerEmail" TEXT NOT NULL,
    "HotmartBuyerDocument" TEXT,
    "HotmartBuyerName" TEXT,
    "HotmartBuyerPhone" TEXT,
    "HotmartBuyerAddressCountryIso" TEXT,
    "HotmartBuyerAddressCountry" TEXT,
    "HotmartBuyerAddressZipCode" TEXT,
    "HotmartBuyerAddressState" TEXT,
    "HotmartBuyerAddressCity" TEXT,
    "HotmartBuyerAddressNeighborhood" TEXT,
    "HotmartBuyerAddressStreet" TEXT,
    "HotmartBuyerAddressComplement" TEXT,
    "HotmartBuyerAddressNumber" TEXT,

    CONSTRAINT "HotmartBuyer_pkey" PRIMARY KEY ("HotmartBuyerId")
);

-- CreateTable
CREATE TABLE "df_servicesystem"."HotmartComissions" (
    "HotmartComissionsId" SERIAL NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP(3) NOT NULL,
    "DeletionDate" TIMESTAMP(3),
    "HotmartComissionsSourceName" TEXT,
    "HotmartComissionsValue" DECIMAL(65,30),
    "HotmartComissionsConvertedToCurrency" TEXT,
    "HotmartComissionsConvertedValue" DECIMAL(65,30),
    "HotmartComissionsCurrencyConvertion" TEXT,
    "hotmartOrderNoteId" INTEGER,

    CONSTRAINT "HotmartComissions_pkey" PRIMARY KEY ("HotmartComissionsId")
);

-- CreateTable
CREATE TABLE "df_servicesystem"."HotmartPurchase" (
    "HotmartPurchaseId" SERIAL NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP(3) NOT NULL,
    "DeletionDate" TIMESTAMP(3),
    "HotmartPurchaseOrderDate" TIMESTAMP(3) NOT NULL,
    "HotmartPurchaseApprovedDate" TIMESTAMP(3) NOT NULL,
    "HotmartPurchaseTransactionId" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "HotmartPurchaseFullPriceValue" DECIMAL(65,30) NOT NULL,
    "HotmartPurchaseFullPriceCurrency" TEXT NOT NULL,
    "HotmartPurchaseOriginalPriceValue" DECIMAL(65,30) NOT NULL,
    "HotmartPurchaseOriginalPriceCurrency" TEXT NOT NULL,
    "HotmartPurchasePriceValue" DECIMAL(65,30) NOT NULL,
    "HotmartPurchasePriceCurrency" TEXT NOT NULL,
    "HotmartPurchaseOfferCode" TEXT NOT NULL,
    "HotmartPurchaseRecurrencyNumber" INTEGER,
    "HotmartPurchaseSubscriptionAnticipationPurchase" BOOLEAN,
    "HotmartPurchaseCheckoutCountryName" TEXT NOT NULL,
    "HotmartPurchaseCheckoutCountryISO" TEXT NOT NULL,
    "HotmartPurchaseUtmCode" TEXT,
    "HotmartPurchaseIsOrderBump" BOOLEAN,
    "HotmartPurchaseOriginalTransactionId" TEXT,
    "HotmartNextChargeDate" TIMESTAMP(3),

    CONSTRAINT "HotmartPurchase_pkey" PRIMARY KEY ("HotmartPurchaseId")
);

-- CreateTable
CREATE TABLE "df_servicesystem"."HotmartPaymentInfos" (
    "HotmartPaymentInfosId" SERIAL NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP(3) NOT NULL,
    "DeletionDate" TIMESTAMP(3),
    "HotmartPaymentInfosBarcode" TEXT,
    "HotmartPaymentInfosBilletUrl" TEXT,
    "HotmartPaymentInfosPixCode" TEXT,
    "HotmartPaymentInfosPixQRCode" TEXT,
    "HotmartPaymentInfosPixExpirationDate" TEXT,
    "HotmartPaymentInfosType" TEXT,
    "HotmartPaymentInfosRefusalReason" TEXT,
    "HotmartPaymentInfosInstallmentNumbers" TEXT,
    "hotmartPurchaseId" INTEGER,

    CONSTRAINT "HotmartPaymentInfos_pkey" PRIMARY KEY ("HotmartPaymentInfosId")
);

-- CreateTable
CREATE TABLE "df_servicesystem"."HotmartSubscription" (
    "HotmartSubscriptionId" INTEGER NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP(3) NOT NULL,
    "DeletionDate" TIMESTAMP(3),
    "HotmartSubscriptionName" TEXT,
    "HotmartSubscriberCode" TEXT,

    CONSTRAINT "HotmartSubscription_pkey" PRIMARY KEY ("HotmartSubscriptionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "HotmartAffiliates_HotmartAffiliateCode_key" ON "df_servicesystem"."HotmartAffiliates"("HotmartAffiliateCode");

-- CreateIndex
CREATE UNIQUE INDEX "HotmartBuyer_HotmartBuyerEmail_key" ON "df_servicesystem"."HotmartBuyer"("HotmartBuyerEmail");

-- CreateIndex
CREATE UNIQUE INDEX "HotmartPurchase_HotmartPurchaseTransactionId_key" ON "df_servicesystem"."HotmartPurchase"("HotmartPurchaseTransactionId");

-- AddForeignKey
ALTER TABLE "df_servicesystem"."HotmartOrderNote" ADD CONSTRAINT "HotmartOrderNote_HotmartProductId_fkey" FOREIGN KEY ("HotmartProductId") REFERENCES "df_servicesystem"."HotmartProduct"("HotmartProductId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "df_servicesystem"."HotmartOrderNote" ADD CONSTRAINT "HotmartOrderNote_HotmartBuyerId_fkey" FOREIGN KEY ("HotmartBuyerId") REFERENCES "df_servicesystem"."HotmartBuyer"("HotmartBuyerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "df_servicesystem"."HotmartOrderNote" ADD CONSTRAINT "HotmartOrderNote_HotmartPurchaseTransActionId_fkey" FOREIGN KEY ("HotmartPurchaseTransActionId") REFERENCES "df_servicesystem"."HotmartPurchase"("HotmartPurchaseTransactionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "df_servicesystem"."HotmartOrderNote" ADD CONSTRAINT "HotmartOrderNote_HotmartSubscriptionId_fkey" FOREIGN KEY ("HotmartSubscriptionId") REFERENCES "df_servicesystem"."HotmartSubscription"("HotmartSubscriptionId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "df_servicesystem"."HotmartAffiliates" ADD CONSTRAINT "HotmartAffiliates_hotmartOrderNoteId_fkey" FOREIGN KEY ("hotmartOrderNoteId") REFERENCES "df_servicesystem"."HotmartOrderNote"("HotmartOrderNoteId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "df_servicesystem"."HotmartComissions" ADD CONSTRAINT "HotmartComissions_hotmartOrderNoteId_fkey" FOREIGN KEY ("hotmartOrderNoteId") REFERENCES "df_servicesystem"."HotmartOrderNote"("HotmartOrderNoteId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "df_servicesystem"."HotmartPaymentInfos" ADD CONSTRAINT "HotmartPaymentInfos_hotmartPurchaseId_fkey" FOREIGN KEY ("hotmartPurchaseId") REFERENCES "df_servicesystem"."HotmartPurchase"("HotmartPurchaseId") ON DELETE SET NULL ON UPDATE CASCADE;
