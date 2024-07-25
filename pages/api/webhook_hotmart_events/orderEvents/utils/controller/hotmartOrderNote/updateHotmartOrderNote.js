"use server";

import prisma from "/app/_lib/prisma";

export async function updateHotmartOrderNote(existingHotmartOrderNotePurchaseTransactionId) {
    try {
        let updateHotmartOrderNote = await prisma.hotmartOrderNote.update({
            where: {
                id: existingHotmartOrderNotePurchaseTransactionId.id,
            },
            data: {
                updateDate: new Date(),
            },
        });
        console.log('HotmartOrderNote updated successfully: ', existingHotmartOrderNotePurchaseTransactionId);
        return updateHotmartOrderNote;
    } catch (error) {
        console.error('Error updating HotmartOrderNote:', error);
        throw error;
    }
}