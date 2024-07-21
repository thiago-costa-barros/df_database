"use server";

import prisma from "/app/_lib/prisma";

export async function updateHotmartAffiliates(affiliate){
    try {
        existingAffiliate = await prisma.hotmartAffiliates.update({
            where: {
                affiliateCode: affiliate.affiliate_code,
            },
            data: {
                updateDate: new Date(),
                lastOrderDate: new Date(),
            },
        });
        return existingAffiliate;
    } catch (error) {
        console.error("Error updating Hotmart Affiliate:", error);
        throw error;
    }
}