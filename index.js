const http = require('http');
const { router } = require('./routes/getRoutes.js');

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    const allowedOrigins = ['http://127.0.0.1:5500', 'http://127.0.0.1:3000', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    router.handle(req, res);
});

server.listen(PORT, HOST, () => {
    console.log(`Server running on port http://${HOST}:${PORT}`);
})