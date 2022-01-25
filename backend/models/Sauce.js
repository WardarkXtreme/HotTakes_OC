//***---Déclaration des variable contenant les packages requis---***/
const mongoose = require('mongoose');
//***---Initialisation de la constante SauceSchema qui contient le type de format attendu pour la Sauce---***/
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: false, default:0},
    dislikes: {type: Number, required: false, default:0},
    usersLiked: {type: [String], required: false},
    usersDisliked: {type: [String], required: false},
});
//***---maintenant nous exportons ce models pour qu'il puisse servir lors de l'appel---***/
module.exports = mongoose.model('Sauce', sauceSchema);