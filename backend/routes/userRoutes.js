//***---Déclaration des variable contenant les packages requis---***/
const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user');
//***---Initialisation des routes pour l'inscription et la connexion de l'utilisateur---***/
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
//***---Exportation des routes---***/
module.exports = router;