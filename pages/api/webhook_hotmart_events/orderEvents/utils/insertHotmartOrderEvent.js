"use server";

import prisma from "/app/_lib/prisma";

export async function insertHotmartOrderEvent(eventData) {
    try {
        const payload = eventData.payload;

        console.log('Check if there is already a record with the same HotmartProductId in our database');

        let hotmartProduct = await prisma.hotmartProduct.findUnique({
            where: {
                id: payload?.product?.id,
            },
        });
        if (!hotmartProduct) {
            console.log('ProductId does not exist in our database, creating a new one:');
            hotmartProduct = await prisma.hotmartProduct.create({
                data: {
                    id: payload?.product?.id,
                    productName: payload?.product?.name,
                    productUcode: payload?.product?.ucode,
                    productHasCoProduction: payload?.product?.has_co_production,
                },
            });
        }
        else {
            console.log('ProductId already exists in our database');
        }
        console.log('Check if there is already a record with the same HotmartBuyerEmail in our database');

        let hotmartBuyer = await prisma.hotmartBuyer.findUnique({
            where: {
                buyerEmail: payload?.buyer?.email,
            },
        });
        if (!hotmartBuyer) {
            console.log('BuyerEmail does not exist in our database, creating a new one:');
            hotmartBuyer = await prisma.hotmartBuyer.create({
                data: {
                    buyerEmail: payload?.buyer?.name,
                    buyerDocument: payload?.buyer?.document,
                    buyerName: payload?.buyer?.name,
                    buyerCheckoutPhone: payload?.buyer?.checkout_phone,
                    buyerAddressCountryIso: payload?.buyer?.address?.country_iso,
                    buyerAddressCountry: payload?.buyer?.address?.country,
                    buyerAddressZipCode: payload?.buyer?.address?.zipcode,
                    buyerAddressState: payload?.buyer?.address?.state,
                    buyerAddressCity: payload?.buyer?.address?.city,
                    buyerAddressNeighborhood: payload?.buyer?.address?.neighborhood,
                    buyerAddressStreet: payload?.buyer?.address?.adress,
                    buyerAddressComplement: payload?.buyer?.address?.complement,
                    buyerAddressNumber: payload?.buyer?.address?.number
                }
            });
        }
        else {
            console.log('BuyerEmail already exists in our database');
        };
        console.log('Check if there is a affiliate data in dataEvent')

        let hotmartAffiliates = null;
        if (payload.affiliate && payload.affiliate.affiliate_code) {
            console.log('Check if there is already a record with the same HotmartAffiliates in our database');
            hotmartAffiliates = await prisma.hotmartAffiliates.findUnique({
                where: { affiliateCode: payload.affiliate.affiliate_code },
            });
            if (!hotmartAffiliates) {
                console.log('AffiliateCode does not exist in our database, creating a new one:');
                hotmartAffiliates = await prisma.hotmartAffiliates.create({
                    data: {
                        affiliateCode: payload.affiliate.affiliate_code,
                        affiliateName: payload.affiliate.affiliate_name,
                    },
                });
            }
            else {
                console.log('AffiliateCode already exists in our database');
            }
        }
        else {
            console.log('There is no affiliate data in dataEvent')
        };
        console.log('Check if there is a subscription data in dataEvent')

        let hotmartSubscription = null;
        if (payload.subscription) {
            console.log('Check if there is already a record with the same HotmartSubscription in our database');
            hotmartSubscription = await prisma.hotmartSubscription.findUnique({
                where: { id: payload.subscription.plan.id },
            });
            if (!hotmartSubscription) {
                console.log('SubscriptionId does not exist in our database, creating a new one:');
                hotmartSubscription = await prisma.hotmartSubscription.create({
                    data: {
                        id: payload.subscription?.plan?.id,
                        subscriptionName: payload.subscription?.plan?.name,
                        subscriberCode: payload.subscription?.subscriber?.code,
                        subscriberStatus: payload.subscription?.status,
                    },
                });
            }
            else {
                console.log('SubscriptionId already exists in our database');
            };
        }
        else {
            console.log('There is no subscription data in dataEvent')
        };
        let hotmartPurchase = await prisma.hotmartPurchase.findUnique({
            where: {
                transactionId: payload.purchase.transaction,
            },
        });
        if (!hotmartPurchase) {
            console.log('Creating a new HotmartPurchase:')
            hotmartPurchase = await prisma.hotmartPurchase.create({
                data: {
                    transactionId: payload.purchase.transaction,
                    orderDate: payload.purchase.order_date,
                    approvedDate: payload.purchase.approved_date,
                    status: payload.purchase.status,
                    fullPriceValue: payload.purchase.full_price?.value,
                    fullPriceCurrency: payload.purchase.full_price?.currency_value,
                    originalPriceValue: payload.purchase.original_offer_price?.value,
                    originalPriceCurrency: payload.purchase.original_offer_price?.currency_value,
                    priceValue: payload.purchase.price?.value,
                    priceCurrency: payload.purchase.price?.currency_value,
                    offerCode: payload.purchase.offer?.code,
                    recurrencyNumber: payload.purchase.recurrency_number,
                    subscriptionAnticipationPurchase: payload.purchase.subscription_anticipation_purchase,
                    checkoutCountryName: payload.purchase.checkout_country_name,
                    checkoutCountryISO: payload.purchase.checkout_country_iso,
                    utmCode: payload.purchase.origin?.code,
                    isOrderBump: payload.purchase.order_bump?.is_order_bump,
                    originalTransactionId: payload.purchase.order_bump?.parent_purchase_transaction,
                    nextChargeDate: payload.purchase.date_next_charge,
                },
            });
        }
        else {
            console.log('TransactionId already exists in our database');
        };
        console.log('Creating a new HotmartComissions:')

        let hotmartComissions = null;
        if (!hotmartComissions) {
            hotmartComissions = await prisma.hotmartComissions.create({
                data: {
                    sourceName: payload.commission?.source,
                    value: payload.commission?.value,
                    currencyValue: payload.commission?.currency_value,
                    convertedToCurrency: payload.commission?.currency_conversion?.converted_to_currency,
                    convertedvalue: payload.commission?.currency_conversion?.converted_value,
                    currencyConvertionRate: payload.commission?.currency_conversion?.conversion_rate,
                },
            });
        };

        console.log("New HotmartOrderNote created: ", newHotmartOrderNote);
    } catch (error) {
        console.error('Error inserting HotmartOrderNote:', error);
    }
}