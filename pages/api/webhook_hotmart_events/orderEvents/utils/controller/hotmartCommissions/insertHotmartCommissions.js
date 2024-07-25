"use server";

import prisma from "/app/_lib/prisma";

export async function insertHotmartCommissions(commissions, hotmartPurchaseId) {
    try {
        console.log('Creating a new HotmartCommissions for PurchaseId: ', hotmartPurchaseId);
        let hotmartCommissions = await Promise.all(commissions.map(async (commission) => {
            return prisma.hotmartCommissions.create({
                data: {
                    hotmartPurchaseId: hotmartPurchaseId,
                    sourceName: commission.source,
                    value: commission.value,
                    currencyValue: commission.currency_value,
                    convertedToCurrency: commission.currency_conversion?.converted_to_currency,
                    convertedvalue: commission.currency_conversion?.converted_value,
                    currencyConvertionRate: commission.currency_conversion?.conversion_rate,
                },
            });
        }));
        console.log('HotmartCommissions created successfully:', hotmartCommissions.id);
        return hotmartCommissions;
    } catch (error) {
        console.error('Error inserting Hotmart Commissions: ', error);
        throw error;
    }
}