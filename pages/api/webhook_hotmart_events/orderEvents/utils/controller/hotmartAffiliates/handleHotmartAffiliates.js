"use server";

import { insertHotmartAffiliates } from "./insertHotmartAffiliates";
import { updateHotmartAffiliates } from "./updateHotmartAffiliates";
import prisma from "/app/_lib/prisma";

export async function handleHotmartAffiliates(eventData) {
    try {
        const payload = eventData.payload; 
        let affiliates = payload.affiliates || [];
        let hotmartAffiliates = await Promise.all(affiliates.map(async (affiliate) => {
            console.log('Check if there is already a record with the same HotmartAffiliates in our database');
            let existingAffiliate = await prisma.hotmartAffiliates.findUnique({
                where: {
                    affiliateCode: affiliate.affiliate_code
                },
            });
            if (!existingAffiliate) {
                console.log('AffiliateCode does not exist in our database, creating a new one:');
                await insertHotmartAffiliates(affiliate);
            }
            else {
                console.log('AffiliateCode already exists in our database');
                await updateHotmartAffiliates(affiliate);
            }
            return existingAffiliate;
        }));
        if (!affiliates) {
            console.log('There is no affiliate data in dataEvent')
        };
    } catch (error) {
        console.error("Error inserting HotmartAffiliates: ",error);
        throw error;
    }
}