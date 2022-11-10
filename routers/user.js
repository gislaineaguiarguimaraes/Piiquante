// On a besoin d'Express
const express = require('express');

// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();

// On associe les fonctions aux différentes routes, on importe le controller
const userCtrl = require('../controllers/user');
const verifyPassword = require('../middleware/verifyPassword')

// Chiffre le mot de passe de l'utilisateur, ajoute l'utilisateur à la base de données
router.post('/signup', verifyPassword,  userCtrl.signup);

// Vérifie les informations d'identification de l'utilisateur
router.post('/login', userCtrl.login);

module.exports = router;