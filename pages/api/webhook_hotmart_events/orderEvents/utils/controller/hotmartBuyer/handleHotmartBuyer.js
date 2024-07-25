"use server";

import { insertHotmartBuyer } from "./insertHotmartBuyer";
import { updateHotmartBuyer } from "./updateHotmartBuyer";
import prisma from "/app/_lib/prisma";

export async function handleHotmartBuyer (eventData){
    try {
        let findHotmartBuyer = await prisma.hotmartBuyer.findUnique({
            where: {
                buyerEmail: eventData.payload?.buyer?.email,
            },
        });
        if (!findHotmartBuyer) {
            console.log('BuyerEmail does not exist in our database, creating a new one:');
            const hotmartBuyer = await insertHotmartBuyer(eventData);
            return hotmartBuyer;
        }
        else {
            console.log('BuyerEmail already exists in our database, updating it:');
            await updateHotmartBuyer(eventData);
        };
        return findHotmartBuyer;
    } catch (error) {
        console.error('Error handling Hotmart buyer:', error);
        throw error;
    }
}