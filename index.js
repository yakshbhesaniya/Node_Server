const http = require('http');
const { router } = require('./routes/getRoutes.js');

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 

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