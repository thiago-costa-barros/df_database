"use server";

import prisma from "/app/_lib/prisma";

async function insertHotmartOrderEvent(eventData) {
    try {
        const payload = eventData.payload;

        let hotmartProduct = await prisma.hotmartProduct.findUnique({
            where: {
                id: payload?.product?.id,
            },
        });
        if (!hotmartProduct) {
            hotmartProduct = await prisma.hotmartProduct.create({
                data: {
                    id: payload?.product?.id,
                    productName: payload?.product?.name,
                    productUcode: payload?.product?.ucode,
                    productHasCoProduction: payload?.product?.has_co_production,
                },
            });
        }

        let hotmartBuyer = await prisma.hotmartBuyer.findUnique({
            where: {
                buyerEmail: payload?.buyer?.email,
            },
        });
        if (!hotmartBuyer) {
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
        };

        let hotmartAffiliates = null;
        if (payload.affiliate && payload.affiliate.affiliate_code) {
            hotmartAffiliates = await prisma.hotmartAffiliates.findUnique({
                where: { affiliateCode: payload.affiliate.affiliate_code },
            });
            if (!hotmartAffiliates) {
                hotmartAffiliates = await prisma.hotmartAffiliates.create({
                    data: {
                        affiliateCode: payload.affiliate.affiliate_code,
                        affiliateName: payload.affiliate.affiliate_name,
                    },
                });
            }
        };

        let hotmartSubscription = null;
        if (payload.subscription) {
            hotmartSubscription = await prisma.hotmartSubscription.findUnique({
                where: { id: payload.subscription.plan.id },
            });
            if (!hotmartSubscription) {
                hotmartSubscription = await prisma.hotmartSubscription.create({
                    data: {
                        id: payload.subscription?.plan?.id,
                        subscriptionName: payload.subscription?.plan?.name,
                        subscriberCode: payload.subscription?.subscriber?.code,
                        subscriberStatus: payload.subscription?.status,
                    },
                });
            }
        };

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