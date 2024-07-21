"use server";

import prisma from "/app/_lib/prisma";

export async function updateHotmartBuyer(eventData){
    try {
        hotmartBuyer = await prisma.hotmartBuyer.update({
            where: {
                buyerEmail: eventData.payload?.buyer?.email,
            },
            data: {
                updateDate: new Date(),
                lastOrderDate: new Date(),
            }
        });
        console.log("HotmartBuyer updated: ", hotmartBuyer.id)
        return hotmartBuyer;
    } catch (error) {
        console.error('Error updating HotmartBuyer:', error);
        throw error;
    }
}