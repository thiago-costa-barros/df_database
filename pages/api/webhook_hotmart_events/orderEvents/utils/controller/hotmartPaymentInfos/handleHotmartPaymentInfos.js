"use server";

import prisma from "/app/_lib/prisma";

export async function handleHotmartPaymentInfos(eventData, parseDate, hotmartPurchaseId) {
    try {
        let hotmartPaymentInfos = await prisma.hotmartPaymentInfos.create({
            data: {
                hotmartPurchaseId: hotmartPurchaseId,
                barcode: eventData.payload?.purchase.payment?.billet_barcode,
                billetUrl: eventData.payload?.purchase.payment?.billet_url,
                pixCode: eventData.payload?.purchase.payment?.pix_code,
                pixQRCode: eventData.payload?.purchase.payment?.pix_qrcode,
                pixExpirationDate: parseDate(eventData.payload?.purchase.payment?.pix_expiration_date),
                type: eventData.payload?.purchase.payment?.type,
                refusalReason: eventData.payload?.purchase.payment?.refusal_reason,
                installmentNumbers: eventData.payload?.purchase.payment?.installments_number,
            },
        });
        return hotmartPaymentInfos;
    } catch (error) {
        console.error('Error creating HotmartPaymentInfos:', error);
        throw error;
    }
}