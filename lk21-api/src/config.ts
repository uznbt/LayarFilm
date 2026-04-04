import dotenv from 'dotenv';
dotenv.config();

// Standard mirrors that are known to work
const MIRRORS = [
    'https://tv2.lk21online.mom',
    'https://tv3.lk21online.mom',
    'https://tv4.lk21online.mom',
    'https://tv10.lk21official.cc'
];

export const LK21_URL = process.env.LK21_URL || MIRRORS[0];
export const ND_URL = process.env.ND_URL || MIRRORS[0]; 
export const PORT = Number(process.env.PORT) || 8080;
export const NODE_ENV = process.env.NODE_ENV || 'development';
