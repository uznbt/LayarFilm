import dotenv from 'dotenv';
dotenv.config();

// Standard mirrors that are known to work
const MIRRORS = [
    'https://tv3.nontondrama.my',
    'https://tv2.lk21online.mom',
    'https://tv3.lk21online.mom',
    'https://tv4.lk21online.mom',
    'https://tv10.lk21official.cc'
];

export const LK21_URL = 'https://tv3.nontondrama.my';
export const ND_URL = 'https://tv3.nontondrama.my'; 
export const PORT = Number(process.env.PORT) || 8080;
export const NODE_ENV = process.env.NODE_ENV || 'development';
