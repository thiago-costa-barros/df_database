"use server";

import { insertHotmartComissions } from "./insertHotmartComissions";

export async function handleHotmartComissions(eventData, hotmartPurchaseId) {
    try {
        let comissions = eventData.payload?.commission || [];

        if (comissions.length === 0) {
            console.log('No comissions to process.');
            return [];
        }
        await insertHotmartComissions(hotmartPurchaseId, comissions);
        console.log('Hotmart Comissions inserted successfully: ', hotmartComissions.id);

        return hotmartComissions;
    } catch (error) {
        console.error('Error handling Hotmart Comissions: ', error);
        throw error;
    }
}