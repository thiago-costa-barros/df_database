"use server";

import { insertHotmartProduct } from "./insertHotmartProduct";
import { updateHotmartProduct } from "./updateHotmartProduct";
import prisma from "/app/_lib/prisma";

export async function handleHotmartProduct(eventData) {
    try {
        let hotmartProduct = await prisma.hotmartProduct.findUnique({
            where: {
                id: eventData.payload?.product?.id,
            },
        });
        if (!hotmartProduct) {
            console.log('ProductId does not exist in our database, creating a new one:');
            await insertHotmartProduct(eventData);
        }
        else {
            console.log('ProductId already exists in our database, updating it:');
            await updateHotmartProduct(eventData);
        };
        return hotmartProduct;
    } catch (error) {
        console.error('Error inserting HotmartProduct:', error);
        throw error;
    }
}