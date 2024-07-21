"use server";

import prisma from "/app/_lib/prisma";

export async function updateHotmartPurchase(eventData, parseDate, currentStatus) {
    try {
        if (currentStatus !== eventData.payload?.purchase?.status) {
            console.log('Updating HotmartPurchase: ', eventData.payload?.purchase?.transaction);
            hotmartProduct = await prisma.hotmartProduct.update({
                where: {
                    transactionId: eventData.payload?.purchase?.transaction
                },
                data: {
                    updateDate: new Date(),
                    lastOrderDate: new Date(),
                    status: eventData.payload?.purchase?.status,
                    approvedDate: parseDate(eventData.payload?.purchase?.approved_date),
                }
            });
            console.log('HotmartPurchase updated successfully.');
        }
        else {
            console.log('No update needed for HotmartPurchase: ', eventData.payload?.purchase?.transaction);
        };
        return hotmartProduct;
    } catch (error) {
        console.error('Error updating HotmartPurchase:', error);
        throw error;
    }
}