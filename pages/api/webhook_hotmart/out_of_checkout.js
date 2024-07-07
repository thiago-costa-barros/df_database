"use server";

import dotenv from 'dotenv';
import prisma from "/app/_lib/prisma";
import { verifyToken } from '../utils/tokenVerification';

dotenv.config();

export default async function handler(req, res) {
  console.log('Iniciando handler'); // Log de debug
  if (req.method === 'POST') {
    console.log('Método POST recebido'); // Log de debug

    if (!verifyToken(req)) {
      console.log('Tokens inválidos, acesso negado'); // Log de debug
      return res.status(403).json({ message: 'Forbidden' });
    }

    try {
      const data = req.body;
      console.log(data);

      if (!prisma) {
        throw new Error('Prisma Client não instanciado corretamente');
      }

      // Verifique se o modelo está definido no Prisma Client
      if (!prisma.externalWebhookHotmartReceiver) {
        throw new Error('Modelo ExternalWebhookHotmartReceiver não encontrado no Prisma Client');
      }
      const parseDate = (bigintDate) => bigintDate ? new Date(parseInt(bigintDate)) : null;
      const newUser = await prisma.externalWebhookHotmartReceiver.create({
        data: {
          eventId: data.id,
          eventDate: parseDate(data.creation_date),
          event: data.event,
          version: data.version,
          productId: data.data.product?.id,
          productName: data.data.product?.name,
          buyerName: data.data.buyer?.name,
          buyerEmail: data.data.buyer?.email,
          buyerCheckoutPhone: data.data.buyer?.checkout_phone,
          offerCode: data.data.offer?.code,
          checkoutCountryName: data.data.checkout_country?.name,
          checkoutCountryIso: data.data.checkout_country?.iso,
        }
      });

      console.log('Nova mensagem recebida:', newUser);

      res.status(200).json({ message: 'Webhook received successfully' });
    } catch (error) {
      console.error('Erro ao processar o webhook:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}