import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
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

        console.log('Dados recebidos do webhook:', data); // Log de debug
        console.log('Comprador:', data.data.buyer);

        const newUser = await prisma.testUser.create({
          data: {
            name: data.data.buyer.name,
            email: data.data.buyer.email,
          },
        });
  
        console.log('Novo usuário criado:', newUser);

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