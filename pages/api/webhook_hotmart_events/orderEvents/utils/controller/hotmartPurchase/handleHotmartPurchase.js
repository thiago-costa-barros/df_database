"use server";

import { handleHotmartCommissions } from "../hotmartCommissions/handleHotmartCommissions";
import { handleHotmartPaymentInfos } from "../hotmartPaymentInfos/handleHotmartPaymentInfos";
import { insertHotmartPurchase } from "./insertHotmartPurchase";
import prisma from "/app/_lib/prisma";

export async function handleHotmartPurchase(eventData, parseDate) {
    try {
        let findHotmartPurchase = await prisma.hotmartPurchase.findUnique({
            where: {
                transactionId: eventData.payload?.purchase?.transaction,
            },
        });
        if (!findHotmartPurchase) {
            console.log('Creating a new HotmartPurchase:');
            let hotmartPurchase = await insertHotmartPurchase(eventData, parseDate);


            console.log('Creating a new HotmartCommissions');
            await handleHotmartCommissions(eventData, hotmartPurchase.id);

            console.log('Creating a new PaymentInfos');
            await handleHotmartPaymentInfos(eventData, parseDate, hotmartPurchase.id);
            console.log('HotmartPurchase created successfully: ', hotmartPurchase.id);
            return hotmartPurchase;
        }
        else {
            console.log('TransactionId already exists in our database');
            return {
                status: 'error',
                message: 'Duplicate TransactionId'
            }
        };
    } catch (error) {
        console.error('Error handling HotmartPurchase:', error);
        throw error;
    }
}