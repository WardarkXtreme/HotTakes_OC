//***---initialisation des ressources nécessaire au bon fonctionnement de l'API---***//
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

//***---initialisation de la variable app qui contient la fonction express---***/
const app = express();
//***---initialisation du chemin d'accées de mongo, et des paramêtre de conection---***/
const srcDb = 'mongodb+srv://flodev:flo001@cluster0.l4gnm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//***---Connexion a la base de donnée mongoDb---***/
mongoose.connect(srcDb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("la connexion est étabie"))
    .catch(() => console.log("Une erreur est survenue lors de votre connexion à mongoDb"))
;

//***---Package installée => express => mongoose => bodyParser => path---***/
module.exports = app;