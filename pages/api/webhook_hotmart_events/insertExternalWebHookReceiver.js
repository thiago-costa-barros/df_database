"use server"

import prisma from "/app/_lib/prisma";

export async function insertExternalWebhookReceiver(data, parseDate) {
    try {
        const newExternalWebhookHotmartReceiver = await prisma.externalWebhookHotmartReceiver.create({
            data: {
              requestId: data.id,
              eventDate: parseDate(data.creation_date),
              eventName: data.event,
              version: data.version,
              payload: data.data,
            }
          });
          console.log("New ExternalWebhookHotmartReceiver insert: ", newExternalWebhookHotmartReceiver.eventName);  
          return newExternalWebhookHotmartReceiver;
    } catch (error) {
        console.error('Error inserting ExternalWebhookReceiver:', error);
        throw error;
    }
}