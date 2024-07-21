"use server";

import prisma from "/app/_lib/prisma";

export async function insertHotmartSubscription(eventData){
    try {
        hotmartSubscription = await prisma.hotmartSubscription.create({
            data: {
                id: eventData.payload?.subscription?.plan?.id,
                subscriptionName: eventData.payload?.subscription?.plan?.name,
                subscriberCode: eventData.payload?.subscription?.subscriber?.code,
                subscriberStatus: eventData.payload?.subscription?.status,
            },
        });
        console.log("New HotmartSubscription created: ", hotmartSubscription.id)
        return hotmartSubscription;
    } catch (error) {
        console.error('Error handling HotmartSubscription:', error);
        throw error;
    }
}