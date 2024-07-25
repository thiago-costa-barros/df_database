"use server"

import { updateHotmartOrderNote } from "./utils/controller/hotmartOrderNote/updateHotmartOrderNote";
import { updateHotmartPurchase } from "./utils/controller/hotmartPurchase/updateHotmartPurchase";
import prisma from "/app/_lib/prisma";

export async function updateHotmartOrderEvent(eventData, existingHotmartOrderNotePurchaseTransactionId) {
    try {
        const parseDate = (bigintDate) => bigintDate ? new Date(parseInt(bigintDate)) : null;
        let hotmartPurchase = await prisma.hotmartPurchase.findUnique({
            where: {
                transactionId: eventData.payload?.purchase?.transaction,
            },
        });
        console.log('Updating HotmartPurchase: ', hotmartPurchase.id);
        await updateHotmartPurchase(eventData, parseDate, hotmartPurchase.status);

        console.log('Updating HotmartOrderNote: ', existingHotmartOrderNotePurchaseTransactionId.id);
        await updateHotmartOrderNote(eventData, existingHotmartOrderNotePurchaseTransactionId);
    } catch (error) {
        console.error('Error updating HotmartOrderNote: ', error);
        throw error;
    }
}