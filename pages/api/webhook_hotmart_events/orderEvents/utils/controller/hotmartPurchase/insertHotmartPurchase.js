"use server";

import prisma from "/app/_lib/prisma";

export async function insertHotmartPurchase(eventData,parseDate){
    try {
        hotmartPurchase = await prisma.hotmartPurchase.create({
            data: {
                transactionId: eventData.payload?.purchase?.transaction,
                orderDate: parseDate(eventData.payload?.purchase?.order_date),
                approvedDate: parseDate(eventData.payload?.purchase?.approved_date),
                status: eventData.payload?.purchase?.status,
                fullPriceValue: eventData.payload?.purchase?.full_price?.value,
                fullPriceCurrency: eventData.payload?.purchase?.full_price?.currency_value,
                originalPriceValue: eventData.payload?.purchase?.original_offer_price?.value,
                originalPriceCurrency: eventData.payload?.purchase?.original_offer_price?.currency_value,
                priceValue: eventData.payload?.purchase?.price?.value,
                priceCurrency: eventData.payload?.purchase?.price?.currency_value,
                offerCode: eventData.payload?.purchase?.offer?.code,
                recurrencyNumber: eventData.payload?.purchase?.recurrency_number,
                subscriptionAnticipationPurchase: eventData.payload?.purchase?.subscription_anticipation_purchase,
                checkoutCountryName: eventData.payload?.purchase?.checkout_country?.name,
                checkoutCountryISO: eventData.payload?.purchase?.checkout_country?.iso,
                utmCode: eventData.payload?.purchase?.origin?.code,
                isOrderBump: eventData.payload?.purchase?.order_bump?.is_order_bump,
                originalTransactionId: eventData.payload?.purchase?.order_bump?.parent_purchase_transaction,
                nextChargeDate: eventData.payload?.purchase?.date_next_charge,
            },
        });
        return hotmartPurchase;
    } catch (error) {
        console.error('Error inserting HotmartPurchase:', error);
        throw error;
    }
}