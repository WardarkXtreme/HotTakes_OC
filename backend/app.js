//initialisation des ressources nécessaire au bon fonctionnement de l'API//
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

//initialisation de la variable app qui contient la fonction express
const app = express();


module.exports = app;