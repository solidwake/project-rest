/* const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if(req.url === '/api/customers') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

server.listen(3000);

console.log('Listening on port 3000...'); */

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');

});

app.get('/api/customers', (req, res) => {
    res.send([1, 2, 3]);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));