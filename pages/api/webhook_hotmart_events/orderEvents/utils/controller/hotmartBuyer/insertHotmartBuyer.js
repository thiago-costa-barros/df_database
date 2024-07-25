"use server";

import prisma from "/app/_lib/prisma";

export async function insertHotmartBuyer (eventData){
    try {
        let hotmartBuyer = await prisma.hotmartBuyer.create({
            data: {
                buyerEmail: eventData.payload?.buyer?.email,
                buyerDocument: eventData.payload?.buyer?.document,
                buyerName: eventData.payload?.buyer?.name,
                buyerCheckoutPhone: eventData.payload?.buyer?.checkout_phone,
                buyerAddressCountryIso: eventData.payload?.buyer?.address?.country_iso,
                buyerAddressCountry: eventData.payload?.buyer?.address?.country,
                buyerAddressZipCode: eventData.payload?.buyer?.address?.zipcode,
                buyerAddressState: eventData.payload?.buyer?.address?.state,
                buyerAddressCity: eventData.payload?.buyer?.address?.city,
                buyerAddressNeighborhood: eventData.payload?.buyer?.address?.neighborhood,
                buyerAddressStreet: eventData.payload?.buyer?.address?.adress,
                buyerAddressComplement: eventData.payload?.buyer?.address?.complement,
                buyerAddressNumber: eventData.payload?.buyer?.address?.number
            }
        });
        console.log("New HotmartBuyer created: ", hotmartBuyer.id);
        return hotmartBuyer;
    } catch (error) {
        console.error('Error inserting Hotmart buyer:', error);
        throw error;
    }
}