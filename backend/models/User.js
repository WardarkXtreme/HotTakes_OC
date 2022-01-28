//***---Déclaration des variable contenant les packages requis---***/
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//***---Initialisation de la constante user schema qui contient le type de format attendu pour le User---***/
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
//***---la constante userSchema va être controller par le plugin unique validator---***//
userSchema.plugin(uniqueValidator, { message: 'Erreur, veuillez réessayer de vous inscrire avec un autre email.' });
//maintenant nous exportons ce models pour qu'il puisse servir lors de l'appel---***//
module.exports = mongoose.model('User', userSchema);