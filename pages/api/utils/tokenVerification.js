import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req) => {
    const token = process.env.MY_SECRET_TOKEN;
    const receivedToken = req.headers['x-hotmart-hottok'];
    console.log('Tokens recebidos:', { token, receivedToken }); // Log de debug
    return token === receivedToken;
  };