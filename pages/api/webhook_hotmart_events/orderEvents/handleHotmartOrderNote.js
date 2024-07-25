"use server";

import prisma from "/app/_lib/prisma";
import { insertHotmartOrderEvent } from "./insertHotmartOrderEvent"
import { updateHotmartOrderEvent } from "./updateHotmartOrderEvent";

export async function handleHotmartOrderNoteEvent(eventData) {
    try {
        console.log('Handling HotmartOrderNote for requestId:', eventData.requestId);
        const existingHotmartOrderNoteRequestId = await prisma.hotmartOrderNote.findFirst({
            where: {
                externalWebhookHotmartReceiver: {
                    requestId: eventData.requestId
                },
                deletionDate: null,
            },
            include: {
                externalWebhookHotmartReceiver: true
            },
        });
        if (!existingHotmartOrderNoteRequestId) {
            console.log('Check if there is already a record with the same HotmartPurchaseTransactionId in our database')
            const existingHotmartOrderNotePurchaseTransactionId = await prisma.hotmartOrderNote.findFirst({
                where: {
                    hotmartPurchase: {
                        transactionId: eventData.payload.purchase?.transaction
                    },
                    deletionDate: null,
                },
                include: {
                    hotmartPurchase: true
                },
            });
            if (!existingHotmartOrderNotePurchaseTransactionId) {
                console.log('HotmartPurchaseTransactionId does not exist in our database, creating a new one HotmartOrderNote')
                await insertHotmartOrderEvent(eventData);
                return {
                    status: 'sucess',
                    message: 'New HotmartOrderEvent created'
                }
            }
            else {
                console.log('There is already a record with this HotmartPurchaseTransactionId in our database', eventData.payload.purchase?.transaction)
                await updateHotmartOrderEvent(eventData, existingHotmartOrderNotePurchaseTransactionId)
                return {
                    status: 'sucess',
                    message: 'Updated HotmartOrderNoteId'
                }
            }
        }
    } catch (error) {
        console.error('Error handling Hotmart order note:', error);
        throw error;
    }
}