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
const { countReset } = require('console');
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
    const pilot = pilots.find(p => p.id === parseInt((req.params.id)));
    if(!pilot) return res.status(404).send('The pilot was not found');
    res.send(pilot);
});

app.post('/api/pilots', (req, res) => {
/*     const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    // Input validation
    if(result.error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    } */

    const {error} = validatePilot(req.body); // result.error
    if(error) return res.status(400).send(error.details[0].message);

    const pilot = {
        id: pilots.length + 1,
        name: req.body.name
    };
    pilots.push(pilot);
    res.send(pilot);
});

app.put('/api/pilots/:id', (req, res) => {
    // Look up the pilot
    // If the pilot does not exist, return 404
    const pilot = pilots.find(p => p.id === parseInt((req.params.id)));
    if(!pilot) return res.status(404).send('The pilot was not found');

    // Validate the input
    // If the input is invalid, return 400
    const {error} = validatePilot(req.body); // result.error
    if(error) return res.status(400).send(error.details[0].message);

    // Update the pilot
    // Return the updated pilot
    pilot.name = req.body.name;
    res.send(pilot);
});

app.delete('/api/pilots/:id', (req, res) => {
    // Look up the pilot
    // If the pilot doesnt exist, reurn 404
    const pilot = pilots.find(p => p.id === parseInt((req.params.id)));
    if(!pilot) return res.status(404).send('The pilot was not found');

    // Delete
    const index = pilots.indexOf(pilot);
    pilots.splice(index, 1);
    
    // Return the same pilot
    res.send(pilot);
});

function validatePilot(pilot) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(pilot, schema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));