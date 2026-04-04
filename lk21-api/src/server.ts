import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';
import { LK21_URL, ND_URL } from './config';

const app: Application = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors({ origin: true, credentials: true }));

app.use(routes);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
        mirrors: {
            LK21: 'https://tv2.lk21online.mom',
            ND: 'https://tv2.lk21online.mom'
        }
    });
});

export default app;
