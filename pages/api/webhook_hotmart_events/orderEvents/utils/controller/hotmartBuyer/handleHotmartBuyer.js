"use server";

import { insertHotmartBuyer } from "./insertHotmartBuyer";
import { updateHotmartBuyer } from "./updateHotmartBuyer";
import prisma from "/app/_lib/prisma";

export async function handleHotmartBuyer (eventData){
    try {
        let hotmartBuyer = await prisma.hotmartBuyer.findUnique({
            where: {
                buyerEmail: eventData.payload?.buyer?.email,
            },
        });
        if (!hotmartBuyer) {
            console.log('BuyerEmail does not exist in our database, creating a new one:');
            await insertHotmartBuyer(eventData);
        }
        else {
            console.log('BuyerEmail already exists in our database, updating it:');
            await updateHotmartBuyer(eventData);
        };
        return hotmartBuyer;
    } catch (error) {
        console.error('Error handling Hotmart buyer:', error);
    }
}