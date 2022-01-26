//***---Déclaration des variable contenant les packages requis---***/
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controller/sauce')

//***---Importation de la securité auth et de la gestion des fichier multer---***/
const auth = require('../middleware/auth');
const multer = require('../middleware/multerConfig');

//***---Initialisation des routes pour l'ajout, la suppression et l'affichage de sauces---***/
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);

//***---Exportation des routes---***/
module.exports = router;