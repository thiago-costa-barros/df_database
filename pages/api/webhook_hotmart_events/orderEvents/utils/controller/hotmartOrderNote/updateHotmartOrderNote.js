"use server";

import prisma from "/app/_lib/prisma";

export async function updateHotmartOrderNote(eventData, existingHotmartOrderNotePurchaseTransactionId) {
    try {
        let updateHotmartOrderNote = await prisma.hotmartOrderNote.update({
            where: {
                id: existingHotmartOrderNotePurchaseTransactionId.id,
            },
            data: {
                updateDate: new Date(),
            },
        });
        return updateHotmartOrderNote;
    } catch (error) {
        console.error('Error updating HotmartOrderNote:', error);
        throw error;
    }
}