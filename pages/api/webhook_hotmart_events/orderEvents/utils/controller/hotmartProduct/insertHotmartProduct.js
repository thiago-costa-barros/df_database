"use server";

import prisma from "/app/_lib/prisma";

export async function insertHotmartProduct (eventData){
    try {
        let hotmartProduct = await prisma.hotmartProduct.create({
            data: {
                id: eventData.payload?.product?.id,
                productName: eventData.payload?.product?.name,
                productUcode: eventData.payload?.product?.ucode,
                productHasCoProduction: eventData.payload?.product?.has_co_production,
                lastOrderDate: new Date(),
            },
        });
        console.log("New HotmartProduct created: ", hotmartProduct.id);
        return hotmartProduct;
    } catch (error) {
        console.error('Error inserting HotmartProduct:', error);
        throw error;
    }
}