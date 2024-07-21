"use server";

import { insertHotmartSubscription } from "./insertHotmartSubscription";
import prisma from "/app/_lib/prisma";

export async function handleHotmartSubscription(eventData){
    try {
        let hotmartSubscription = null;
        if (eventData.payload?.subscription) {
            console.log('Check if there is already a record with the same HotmartSubscription in our database');
            hotmartSubscription = await prisma.hotmartSubscription.findUnique({
                where: {
                    id: eventData.payload?.subscription?.plan.id
                },
            });
            if (!hotmartSubscription) {
                console.log('SubscriptionId does not exist in our database, creating a new one:');
                await insertHotmartSubscription(eventData);
            }
            else {
                console.log('SubscriptionId already exists in our database');
            };
        }
        else {
            console.log('There is no subscription data in dataEvent')
        };
        return hotmartSubscription;
    } catch (error) {
        console.error('Error handling HotmartSubscription:', error);
        throw error;
    }
}