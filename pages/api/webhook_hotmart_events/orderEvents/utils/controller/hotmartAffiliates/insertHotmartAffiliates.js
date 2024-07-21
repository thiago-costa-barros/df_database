"use server";

import prisma from "/app/_lib/prisma";

export async function insertHotmartAffiliates(affiliate){
    try {
        existingAffiliate = await prisma.hotmartAffiliates.create({
            data: {
                affiliateCode: affiliate.affiliate_code,
                affiliateName: affiliate.affiliate_name,
            },
        });
        return existingAffiliate;
    } catch (error) {
        console.error("Error inserting HotmartAffiliates: ",error);
        throw error;
    }
}