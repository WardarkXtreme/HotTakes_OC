//***---Déclaration des variable contenant les packages requis---***/
const jwt = require('jsonwebtoken');
require('dotenv').config()
//***---Exportation de la fonction de création de token pour l'utilisateur---***/
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_T);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Le résultat de comparaison ne vous permet pas de continuer.';
        } else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({ message: 'La requête ne peut aboutir, vérifiez vos informations de connexion.' }),
        error => console.log(error)
    }
}