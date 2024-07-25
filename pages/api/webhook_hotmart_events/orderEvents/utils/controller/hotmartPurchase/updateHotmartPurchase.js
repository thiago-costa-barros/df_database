"use server";

import { log } from "console";
import prisma from "/app/_lib/prisma";

export async function updateHotmartPurchase(eventData, parseDate, currentStatus) {
    try {
        console.log('CurrentStatus: ',currentStatus);
        console.log('EventStatus: ', eventData.payload?.purchase?.status);
        if (currentStatus !== eventData.payload?.purchase?.status) {
            console.log('Divergent status. Updating HotmartPurchaseId: ', eventData.payload?.purchase?.transaction);
            let hotmartPurchase = await prisma.hotmartPurchase.update({
                where: {
                    transactionId: eventData.payload?.purchase?.transaction
                },
                data: {
                    updateDate: new Date(),
                    status: eventData.payload?.purchase?.status,
                    approvedDate: parseDate(eventData.payload?.purchase?.approved_date),
                }
            });
            console.log('HotmartPurchase updated successfully.');
            return hotmartPurchase;
        }
        else {
            console.log('No update needed for HotmartPurchase: ', eventData.payload?.purchase?.transaction);
        };
        return hotmartPurchase;
    } catch (error) {
        console.error('Error updating HotmartPurchase:', error);
        throw error;
    }
}