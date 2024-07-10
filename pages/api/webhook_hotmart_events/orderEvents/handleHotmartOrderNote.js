"use server";

import prisma from "/app/_lib/prisma";

export async function handleHotmartOrderNote(eventData) {
    try {
        const existingHotmartOrderNoteRequestId = await prisma.handleHotmartOrderNote.findFirst({
            where: {
                requestId: eventData.requestId,
                deletionDate: null,
            },
        });
        if (!existingHotmartOrderNoteRequestId) {
            // Verifique se já existe um registro com o mesmo hotmartPurchaseTransactionId em HotmartOrderNote
            const existingHotmartOrderNotePurchaseTransactionId = await prisma.hotmartOrderNote.findFirst({
                where: {
                    hotmartPurchaseTransactionId: eventData.payload.purchase?.transaction,
                },
            });
            if (!existingHotmartOrderNotePurchaseTransactionId) {
                //await insertHotmartOrderEvent(eventData);
            }
        }
    } catch (error) {

    }
}