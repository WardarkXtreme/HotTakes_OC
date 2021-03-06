//***---initialisation des ressources nécessaire au bon fonctionnement de l'API---***//
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

//***---créations de constante recupérant le chemin de nos routes---***/
const userRoutes = require('./routes/userRoutes');
const sauceRoutes = require('./routes/sauceRoutes');
//***---initialisation de la variable app qui contient la fonction express---***/
const app = express();

//***---initialisation du chemin d'accées de mongo, et des paramêtre de conection---***/
const srcDb = process.env.SECRET_DB;
//***---Connexion a la base de donnée mongoDb---***/
mongoose.connect(srcDb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("la connexion est étabie"))
    .catch(() => console.log("Une erreur est survenue lors de votre connexion à mongoDb"))
;

//***---Implantation du Cross Origin Ressource Sharing---***/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//***------***/
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

//***---Package installée => express => mongoose => bcrypt => multer => bodyParser => mongoose unique validator => nodemon => jsonwebtoken => path---***/
module.exports = app;