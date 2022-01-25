//***---Déclaration des variable contenant les packages requis---***/
const jwt = require('jsonwebtoken');
//***---Exportation de la fonction de création de token pour l'utilisateur---***/
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `RDM_TOKEN_SECRET`);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Cet utilisateur est inconnu.';
        } else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({ message: 'La requête ne peut aboutir, vérifiez vos informations de connexion.' }),
        error => console.log(error)
    }
}