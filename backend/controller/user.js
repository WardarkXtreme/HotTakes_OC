//***---Importation des packages requis---***/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//***---Importation du Model Nécessaire aux controllers---***/
const User = require("../models/User");
//***---Création des fonctions de controlles---***/
//***---Controlleur d'inscription---***/
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const user = new User({ email: req.body.email, password: hash });
        user.save()
        .then(() => res.status(201).json({ message: "Utilisateur créé avec succés" }))
        .catch(err => console.log(err));
    })
    .catch(err => res.status(500).json({ err }));
};
//***---Controlleur de connexion---***/
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.status(401).json({ error: "il semblerait que votre email ou votre mot de passe soit incorect"})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: "il semblerait que votre email ou votre mot de passe soit incorect"})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, process.env.SECRET_T, { expiresIn: '24h'})
            });
        })
        .catch(err => console.log(err));
    })
    .catch(err => res.status(500).json({ err }));
};