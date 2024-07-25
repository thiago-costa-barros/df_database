"use server";

import { insertHotmartCommissions } from "./insertHotmartCommissions";

export async function handleHotmartCommissions(eventData, hotmartPurchaseId) {
    try {
        console.log('Handling Hotmart Commissions: ', eventData.payload?.commissions);
        let commissions = eventData.payload?.commissions || [];

        if (commissions.length === 0) {
            console.log('No commissions to process.');
            return [];
        }
        const hotmartCommissions = await insertHotmartCommissions(commissions, hotmartPurchaseId);
        console.log('Hotmart Commissions inserted successfully: ', hotmartCommissions.id);

        return hotmartCommissions;
    } catch (error) {
        console.error('Error handling Hotmart Commissions: ', error);
        throw error;
    }
}