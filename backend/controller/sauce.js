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
exports.createSauce = (req, res, next) => {
    const getCreateSauce = JSON.parse(req.body.sauce);
    delete getCreateSauce._id;
    const sauce = new Sauce({
        ...getCreateSauce,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'sauce ajouté avec succés.'}))
    .catch(err => {
        res.status(400).json({ err });
        console.log(err);
    });
};

//***---Controlleur de modification de sauce---***/
exports.modifySauce = (req, res, next) => {
    Sauce.findOne({ _id : req.params.id})
    .then(sauce => {
        if(sauce.userId != req.body.userId) {
            res.status(401).json({ message: 'il semblerait que cette sauce ne soit pas à vous.'})
        }else {
            if(req.file) {
                const sauceName = sauce.imageUrl.split('/images/')[1];
                const getModifySauce = JSON.parse(req.body.sauce);
                fs.unlink(`images/${sauceName}`, () => {
                    const newModification = {
                        ...getModifySauce,
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    };
                    Sauce.updateOne({ _id: req.params.id }, { ...newModification, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Modification effectuée avec succés.' }))
                    .catch(err => res.status(400).json({ err }));
                })
            }else {
                const newModification = { ...req.body};
                Sauce.updateOne({ _id: req.params.id }, { ...newModification, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Modification effectuée avec succés.' }))
                .catch(err => res.status(400).json({ err }));
            }
        }
    })
    .catch(err => res.status(500).json({ err }));
};