"use server";

import { handleHotmartAffiliates } from "./utils/controller/hotmartAffiliates/handleHotmartAffiliates";
import { handleHotmartBuyer } from "./utils/controller/hotmartBuyer/handleHotmartBuyer";
import { handleHotmartProduct } from "./utils/controller/hotmartProduct/handleHotmartProduct";
import { handleHotmartSubscription } from "./utils/controller/hotmartSubscription/handleHotmartSubscription";
import { handleHotmartPurchase } from "./utils/controller/hotmartPurchase/handleHotmartPurchase";
import { insertHotmartOrderNote } from "./utils/controller/hotmartOrderNote/insertHotmartOrderNote";

export async function insertHotmartOrderEvent(eventData) {
    try {
        const parseDate = (bigintDate) => bigintDate ? new Date(parseInt(bigintDate)) : null;

        console.log('Check if there is already a record with the same HotmartProductId in our database');
        const hotmartProduct = await handleHotmartProduct(eventData);

        console.log('Check if there is already a record with the same HotmartBuyerEmail in our database');
        const hotmartBuyer = await handleHotmartBuyer(eventData);

        console.log('Check if there is a affiliate data in dataEvent');
        const hotmartAffiliates = await handleHotmartAffiliates(eventData);

        console.log('Check if there is a Subscription data in dataEvent');
        const hotmartSubscription = await handleHotmartSubscription(eventData);

        console.log('Check if there is a Purchase data in dataEvent');
        const hotmartPurchase = await handleHotmartPurchase(eventData, parseDate);
     
        console.log('Creating a new HotmartOrderNote')
        await insertHotmartOrderNote(eventData, hotmartPurchase, hotmartProduct, hotmartBuyer, hotmartSubscription, hotmartAffiliates)

    } catch (error) {
        console.error('Error inserting HotmartOrderNote: ', error);
        throw error;
    }
}