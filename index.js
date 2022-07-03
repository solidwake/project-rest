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

const Joi = require('joi');
const express = require('express');
const { join } = require('path');
const app = express();

app.use(express.json());

const pilots = [
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

app.get('/api/pilots', (req, res) => {
    res.send(pilots);
});

// Route parameters
/* app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
}); */

// Query string parameters
/* app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
}); */

app.get('/api/pilots/:id', (req, res) => {
    const pilot = pilots.find(c => c.id === parseInt((req.params.id)));
    if(!pilot) res.status(404).send('The pilot was not found');
    res.send(pilot);
});

app.post('/api/pilots', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    // Input validation
    if(result.error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const pilot = {
        id: pilots.length + 1,
        name: req.body.name
    };
    pilots.push(pilot);
    res.send(pilot);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));