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

const customers = [
    {
        id: 1,
        name: 'Amuro Ray'
    },
    {
        id: 2,
        name: 'Char Aznable'
    },
    {
        id: 3,
        name: 'Kamille Bidan'
    },
    {
        id: 4,
        name: 'Kou Uraki'
    },

]

app.get('/', (req, res) => {
    res.send('Hello World');

});

app.get('/api/customers', (req, res) => {
    res.send(customers);
});

// Route parameters
/* app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
}); */

// Query string parameters
/* app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
}); */

app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt((req.params.id)));
    if(!customer) res.status(404).send('The customer was not found');
    res.send(customer);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));