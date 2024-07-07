import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req) => {
    const token = process.env.MY_SECRET_TOKEN;
    const receivedToken = req.headers['x-hotmart-hottok'];
    return token === receivedToken;
  };