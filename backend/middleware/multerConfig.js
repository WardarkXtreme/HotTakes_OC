//***---Déclaration des variable contenant les packages requis---***/
const multer = require('multer');
//***---traduction des mimetypes pour l'extention---***/
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
//***---création de la fonction multer---***/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');//***---null pour dire qu'il n'y a pas d'erreur, en deuxieme argument le nom du dossier---***/
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');//***---gestion du nouveau nom remplacement des espace par des enderscores*/
    const extension = MIME_TYPES[file.mimetype];//***---creation de l'extention grace au traduction de mimetypes---***/
    callback(null, name + Date.now() + '.' + extension);//***---premiére argument null pour dire qu'il n'y a pas d'erreur, deuxieme argument initialise notre nouveau nom de fichier---***/
  }
});
//***---on appel multer on lui passe l'objet storage et on lui passe single pour lui dire que l'objet est unique et on lui informe que c'est une image---***/
module.exports = multer({storage: storage}).single('image');