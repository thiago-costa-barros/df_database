"use server";

import dotenv from 'dotenv';
import prisma from "/app/_lib/prisma";
import { verifyToken } from './utils/tokenVerification';
import { setDeletionDateExternalWebhookReceiver } from './webhook_hotmart_events/setDeletionDateExternalWebhookReceiver';
import { insertExternalWebhookReceiver } from './webhook_hotmart_events/insertExternalWebHookReceiver';
import { routeEventHotmartWebhook } from './webhook_hotmart_events/eventWebhookRoute';

dotenv.config();

export default async function handler(req, res) {
  console.log('Starting handler'); // Log de debug
  if (req.method === 'POST') {
    console.log('Method POST received'); // Log de debug

    if (!verifyToken(req)) {
      console.log('Invalid tokens, access denied'); // Log de debug
      return res.status(403).json({ message: 'Forbidden' });
    }

    try {
      const data = req.body;
      console.log("Webhook received: ", data.event);

      if (!prisma) {
        throw new Error('Prisma Client not instantiated correctly');
      }

      // Verifique se o modelo está definido no Prisma Client
      if (!prisma.externalWebhookHotmartReceiver) {
        throw new Error('Model ExternalWebhookHotmartReceiver not founded in Prisma Client');
      }

      console.log('Checking if there is a ReceiverId in out database: ', data.id)
      const existingExternalWebhookReceiverId = await prisma.externalWebhookHotmartReceiver.findUnique({
        where: {
          requestId: data.id,
          deletionDate: null,
        }
      });
      if (!existingExternalWebhookReceiverId) {
        console.log('Creating a new ExternalWebhookReceiver:')
        const parseDate = (bigintDate) => bigintDate ? new Date(parseInt(bigintDate)) : null;
        await insertExternalWebhookReceiver(data, parseDate);

        const newExternalWebhookHotmartReceiver = await prisma.externalWebhookHotmartReceiver.findUnique({
          where: {
            requestId: data.id,
            deletionDate: null,
          }
        });
        console.log('Webhook processed successfully. Checking routes events');
        await routeEventHotmartWebhook(newExternalWebhookHotmartReceiver.eventName, newExternalWebhookHotmartReceiver);
      }
      else {
        console.log("ExternalWebhookHotmartReceiver already exists: ", existingExternalWebhookReceiverId.requestId);
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw error;
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}