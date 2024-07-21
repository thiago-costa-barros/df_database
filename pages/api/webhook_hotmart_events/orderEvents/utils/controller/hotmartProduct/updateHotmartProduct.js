"use server";

import prisma from "/app/_lib/prisma";

export async function updateHotmartProduct (eventData){
    try {
        hotmartProduct = await prisma.hotmartProduct.update({
            where: {
                id: eventData.payload?.product?.id,
            },
            data: {
                updateDate: new Date(),
                lastOrderDate: new Date(),
            },
        });
        console.log("HotmartProduct updated: ", hotmartProduct.id);
        return hotmartProduct;
    } catch (error) {
        console.error('Error updating HotmartProduct:', error);
        throw error;
    }
}