const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {

    const corsWhitelist = [
            'http://localhost:3000',
            'http://localhost:4200',
    ];
    if (corsWhitelist.includes(req.headers.origin)) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    }
  });

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet crée'
    });
});

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id        : '1',
            title      : 'Des lunettes',
            description: 'Les infos de mon premier objet',
            imageUrl   : '',
            price      : 4000,
            userId     : 'qsomhivqios',
        },
        {
            _id        : '2',
            title      : 'Une clé USB non fonctionnelle',
            description: 'Les infos de mon deuxième objet',
            imageUrl   : 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price      : 2900,
            userId     : 'qsomihvqios',
        },
    ];
  res.status(200).json(stuff);
});

module.exports = app;

