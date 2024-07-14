"use server";

import prisma from "/app/_lib/prisma";
import { insertHotmartOrderEvent } from "./utils/insertHotmartOrderEvent"

export async function handleHotmartOrderNote(eventData) {
    try {
        console.log('Handling Hotmart order note for requestId:', eventData.requestId);
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
                console.log('HotmartPurchaseTransactionId does not exist in our database, creating a new one HotmartOrderEvent')
                await insertHotmartOrderEvent(eventData);
                return {
                    status:'sucess',
                    message: 'New HotmartOrderEvent created'
                }
            }
            else {
                console.log('There is already a record with this HotmartPurchaseTransactionId in our database', eventData.payload.purchase?.transaction)
                return {
                    status:'error',
                    message: 'Duplicate HotmartPurchaseTransactionId'
                }
            }
        }
        else {
            console.log('There is already a record with this RequestId in our database', eventData.requestId)
        }
    } catch (error) {
        console.error('Error handling Hotmart order note:', error);
    }
}