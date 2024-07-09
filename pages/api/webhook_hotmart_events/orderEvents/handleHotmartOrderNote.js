"use server";

import prisma from "/app/_lib/prisma";

export async function handleHotmartOrderNote(eventData) {
    try {
        const existingHotmartOrderNoteRequestId = await prisma.handleHotmartOrderNote.findFirst({
            where: {
                requestId: eventData.requestId,
            },
        });
        if (!existingHotmartOrderNoteRequestId) {
            // Verifique se já existe um registro com o mesmo hotmartPurchaseTransactionId em HotmartOrderNote
            const existingHotmartOrderNotePurchaseTransactionId = await prisma.hotmartOrderNote.findFirst({
              where: {
                hotmartPurchaseTransactionId: eventData.payload.purchase?.transaction,
              },
            });
        if(!existingHotmartOrderNotePurchaseTransactionId){
            const externalWebhookHotmartReceiverJoin = await prisma.externalWebhookHotmartReceiver.findUnique({
                where: {
                    requestId: eventData.requestId,
                    deletionDate: null,
                },
                include: {
                    HotmartOrderNote:true
                },
            });
            if(!externalWebhookHotmartReceiverJoin){
                console.log("No externalWebhookHotmartReceiverJoin found for requestId: ", eventData.requestId);
                return;
            }
            else {  
                const insertHotmartOrderNote = await prisma.hotmartOrderNote.create({

                })
            }
            }
        }
    } catch (error) {
        
    }
}