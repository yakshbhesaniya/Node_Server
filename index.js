const http = require('http');
const { router } = require('./routes/getRoutes.js');

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    router.handle(req, res);
});

server.listen(PORT, HOST, () => {
    console.log(`Server running on port http://${HOST}:${PORT}`);
})