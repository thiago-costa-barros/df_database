import dotenv from 'dotenv';
import { db } from "@/app/_lib/prisma";

dotenv.config();

export default async function handler(req, res) {
  console.log('Iniciando handler'); // Log de debug
  if (req.method === 'POST') {
    console.log('Método POST recebido'); // Log de debug
    const token = req.headers['token'];
    const receivedToken = req.headers['receivedtoken'];

    const MY_SECRET_TOKEN = process.env.MY_SECRET_TOKEN;
    const MY_RECEIVED_TOKEN = process.env.MY_RECEIVED_TOKEN;

    console.log('Tokens recebidos:', { token, receivedToken }); // Log de debug


    if (token !== MY_SECRET_TOKEN || receivedToken !== MY_RECEIVED_TOKEN) {
      console.log('Tokens inválidos, acesso negado'); // Log de debug
      return res.status(403).json({ message: 'Forbidden' });
    }

    try {
      const data = req.body;
      console.log(data.id)
      // Logar todos os objetos antes de criar o novo usuário
      // console.log('Data:', data);
      // console.log('Produto:', data.data.product);
      // console.log('Afiliados:', data.data.affiliates);
      // console.log('Comprador:', data.data.buyer);
      // console.log('Endereço:', data.data.buyer.address);
      // console.log('Produtor:', data.data.producer);
      // console.log('Comissões:', data.data.commissions);
      // console.log('Compra:', data.data.purchase);

      if (!prisma) {
        throw new Error('Prisma Client não instanciado corretamente');
      }

      // Verifique se o modelo está definido no Prisma Client
      if (!prisma.externalWebhookHotmartReceiver) {
        throw new Error('Modelo ExternalWebhookHotmartReceiver não encontrado no Prisma Client');
      }

      const newUser = await db.externalWebhookHotmartReceiver.create({
        data: {
          eventId: data.id,
          eventDate: new Date(data.creation_date),
          event: data.event,
          // version: data.version,
          // productId: data.data.product.id,
          // productUcode: data.data.product.ucode,
          // productName: data.data.product.name,
          // productHasCoProduction: data.data.product.has_co_production,
          // affiliateCode: data.data.affiliates[0]?.affiliate_code || null,
          // affiliateName: data.data.affiliates[0]?.name || null,
          // buyerName: data.data.buyer.name,
          // buyerEmail: data.data.buyer.email,
          // buyerCheckoutPhone: data.data.buyer.checkout_phone,
          // buyerZipcode: data.data.buyer.address.zipcode,
          // buyerCountry: data.data.buyer.address.country,
          // buyerNumber: data.data.buyer.address.number,
          // buyerAddress: data.data.buyer.address.address,
          // buyerCity: data.data.buyer.address.city,
          // buyerState: data.data.buyer.address.state,
          // buyerNeighborhood: data.data.buyer.address.neighborhood,
          // buyerComplement: data.data.buyer.address.complement,
          // buyerCountryIso: data.data.buyer.address.country_iso,
          // producerName: data.data.producer.name,
          // commissionValue1: data.data.commissions[0]?.value || null,
          // commissionCurrencyValue1: data.data.commissions[0]?.currency_value || null,
          // commissionSource1: data.data.commissions[0]?.source || null,
          // purchaseApprovedDate: new Date(data.data.purchase.approved_date),
          // purchaseFullPriceValue: data.data.purchase.full_price?.value || null,
          // purchaseFullPriceCurrencyValue: data.data.purchase.full_price?.currency_value || null,
          // purchaseOriginalOfferPriceCurrencyValue: data.data.purchase.original_offer_price?.currency_value || null,
          // purchaseOriginalOfferPriceValue: data.data.purchase.original_offer_price?.value || null,
          // purchasePriceValue: data.data.purchase.price?.value || null,
          // purchasePriceCurrencyValue: data.data.purchase.price?.currency_value || null,
          // purchaseOfferCode: data.data.purchase.offer?.code || null,
          // purchaseRecurrenceNumber: data.data.purchase.recurrence_number || null,
          // purchaseSubscriptionAnticipationPurchase: data.data.purchase.subscription_anticipation_purchase || null,
          // purchaseCheckoutCountryName: data.data.purchase.checkout_country?.name || null,
          // purchaseCheckoutCountryIso: data.data.purchase.checkout_country?.iso || null,
          // purchaseOriginXcod: data.data.purchase.origin?.xcod || null,
          // purchaseOrderBumpIsOrderBump: data.data.purchase.order_bump?.is_order_bump || null,
          // purchaseOrderBumpParentPurchaseTransaction: data.data.purchase.order_bump?.parent_purchase_transaction || null,
          // purchaseOrderDate: new Date(data.data.purchase.order_date),
          // purchaseDateNextCharge: new Date(data.data.purchase.date_next_charge),
          // purchaseStatus: data.data.purchase.status,
          // purchaseTransaction: data.data.purchase.transaction,
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