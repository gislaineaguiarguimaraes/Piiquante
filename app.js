const express = require('express');   // On a besoin d'Express
const bodyParser = require('body-parser');   // permet de lire les éléments parser (format json) reçu par le front
const app = express();
const mongoose = require('mongoose');
// lecture du chemin d'accès aux images
const path = require('path');

const saucesRoutes = require('./routers/sauce');
const userRoutes = require('./routers/user');

// connexion à mongoose
mongoose.connect('mongodb+srv://gislaine:70227589@cluster0.qpqtszo.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(helmet());
app.use(cors())

/* CORS - Permet d'accéder au front - lien entre les 2 serveurs grâce aux autorisations ci-dessous */
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
});

app.use(bodyParser.json());

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;