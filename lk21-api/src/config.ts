import dotenv from 'dotenv';
dotenv.config();

export const LK21_URL = process.env.LK21_URL || 'https://tv3.lk21online.mom';
export const ND_URL = process.env.ND_URL || 'https://tv3.lk21online.mom';
export const PORT = Number(process.env.PORT) || 8080;
export const NODE_ENV = process.env.NODE_ENV || 'development';
