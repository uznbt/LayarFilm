import server from './server';

const port: number = Number(process.env.PORT) || 8080;

if (process.env.NODE_ENV !== 'production') {
    server.listen(port, () => {
        console.log(`[${port}] server running`);
    });
}

export default server;
