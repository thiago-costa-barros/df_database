"use server"

import prisma from "/app/_lib/prisma";

export async function setDeletionDateExternalWebhookReceiver(existingExternalWebhookReceiverId) {
    try {
        setDeletionDateExternalWebhookReceiver = await prisma.externalWebhookHotmartReceiver.update({
            where :{
                requestId: existingExternalWebhookReceiverId.requestId,
            },
            data: {
                deletionDate: new Date(),
                updateDate: new Date(),
            },
        })
        console.log('ExternalWebhookReceiver updated successfully:', setDeletionDateExternalWebhookReceiver);
        return setDeletionDateExternalWebhookReceiver;
    } catch (error) {
        console.error('Error setting DeletionDate for ExternalWebhookReceiver:', error);
        throw error;
    }
}