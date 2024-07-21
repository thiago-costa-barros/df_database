"use server";

import prisma from "/app/_lib/prisma";

export async function insertHotmartComissions(comissions, hotmartPurchaseId){
    try {
        console.log('Creating a new HotmartComissions:');
        let hotmartComissions = await Promise.all(comissions.map(async (comission) => {
            return prisma.hotmartComissions.create({
                data: {
                    transactionId: hotmartPurchaseId,
                    sourceName: comission.source,
                    value: comission.value,
                    currencyValue: comission.currency_value,
                    convertedToCurrency: comission.currency_conversion?.converted_to_currency,
                    convertedvalue: comission.currency_conversion?.converted_value,
                    currencyConvertionRate: comission.currency_conversion?.conversion_rate,
                },
            });
        }));
        return hotmartComissions;
    } catch (error) {
        console.error('Error inserting Hotmart Comissions: ', error);
        throw error;
    }
}