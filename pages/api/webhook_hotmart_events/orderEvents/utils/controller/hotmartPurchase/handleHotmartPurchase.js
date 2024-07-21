"use server";

import { insertHotmartPurchase } from "./insertHotmartPurchase";
import { updateHotmartPurchase } from "./updateHotmartPurchase";
import prisma from "/app/_lib/prisma";

export async function handleHotmartPurchase(eventData,parseDate){
    try {
        let hotmartPurchase = await prisma.hotmartPurchase.findUnique({
            where: {
                transactionId: eventData.payload?.purchase?.transaction,
            },
        });
        if (!hotmartPurchase) {
            console.log('Creating a new HotmartPurchase:');
            await insertHotmartPurchase(eventData, parseDate);
        }
        else {
            console.log('TransactionId already exists in our database, updating it:');
            await updateHotmartPurchase(eventData,parseDate,hotmartPurchase.status);
        };
        return hotmartPurchase;
    } catch (error) {
        console.error('Error handling HotmartPurchase:', error);
        throw error;
    }
}