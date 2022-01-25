//***---Déclaration des variable contenant les packages requis---***/
const express = require('express');
const router = express.Router();
const sauceCtrl = require("../controllers/sauce")

//***---Importation de la securité auth et de la gestion des fichier multer---***/
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//***---Initialisation des routes pour l'ajout et l'affichage de sauces---***/
router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);

//***---Exportation des routes---***/
module.exports = router;