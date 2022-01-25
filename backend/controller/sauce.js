//***---Déclaration des variable contenant les packages requis---***/
const Sauce = require('../models/Sauce');
const fs = require('fs');

//***---Création des fonctions de controlles---***/
//***---Controlleur d'envoi d'information de toutes les sauces---***/
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(err => res.status(400).json({ err }));
};

//***---Controlleur d'envoi d'information d'une sauce---***/
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(err => res.status(404).json({ err }));
};

//***---Controlleur de création de sauce---***/
exports.createSauce() = (req, res, next) => {
    const getCreateSauce = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...getCreateSauce,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: "votre sauce est ajoutée" }))
    .catch(err => res.status(400).json({ err }))
}