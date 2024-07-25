"use server";

import prisma from "/app/_lib/prisma";

export async function insertHotmartOrderNote(eventData, hotmartPurchase, hotmartProduct, hotmartBuyer, hotmartSubscription, hotmartAffiliates) {
    try {
        console.log("Inserting HotmartOrderNote...");
        const affiliateConnections = Array.isArray(hotmartAffiliates) 
            ? hotmartAffiliates.map(affiliate => ({
                id: affiliate.id
            })) 
            : [];
        let newHotmartOrderNote = await prisma.hotmartOrderNote.create({
            data: {
                externalWebhookHotmartReceiverId: eventData.id,
                hotmartProductId: hotmartProduct.id,
                hotmartBuyerId: hotmartBuyer.id,
                hotmartPurchaseId: hotmartPurchase.id,
                producerName: eventData.payload?.producer?.name,
                hotmartSubscriptionId: hotmartSubscription ? hotmartSubscription.id : null,
                hotmartAffiliates: {
                    connect: affiliateConnections
                },
            },
        });
        console.log("New HotmartOrderNote created: ", newHotmartOrderNote);
        return newHotmartOrderNote;
    } catch (error) {
        console.log("Error handling HotmartOrderNote: ", error);
        throw error;
    }
}