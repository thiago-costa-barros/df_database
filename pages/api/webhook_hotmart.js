"use server";

import dotenv from 'dotenv';
import prisma from "/app/_lib/prisma";
import { verifyToken } from './utils/tokenVerification';
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
      console.log("Webhook received: ",data.event);

      if (!prisma) {
        throw new Error('Prisma Client not instantiated correctly');
      }

      // Verifique se o modelo está definido no Prisma Client
      if (!prisma.externalWebhookHotmartReceiver) {
        throw new Error('Model ExternalWebhookHotmartReceiver not founded in Prisma Client');
      }
      const parseDate = (bigintDate) => bigintDate ? new Date(parseInt(bigintDate)) : null;
      const newExternalWebhookHotmartReceiver = await prisma.externalWebhookHotmartReceiver.create({
        data: {
          requestId: data.id,
          eventDate: parseDate(data.creation_date),
          eventName: data.event,
          version: data.version,
          payload: data.data,
        }
      });

      console.log("New ExternalWebhookHotmartReceiver insert: ",newExternalWebhookHotmartReceiver.eventName);

      res.status(200).json({ message: 'Webhook received successfully' });

      await routeEventHotmartWebhook(data.event, data.data);
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}