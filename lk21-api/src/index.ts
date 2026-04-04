import server from './server';
import { PORT, NODE_ENV } from './config';

if (NODE_ENV !== 'production') {
    server.listen(PORT, () => {
        console.log(`[${PORT}] server running`);
    });
}

export default server;
