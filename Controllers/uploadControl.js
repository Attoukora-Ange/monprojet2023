const { validationResult, body } = require("express-validator");

const UploadControl = (req, res, next) => {
 // Capture des erreur au cours de la modification
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
 }

  if (!req.body.fichierDocument)
    return res.status(200).json("Le champs fichier est vide");
  const verifierPDFouTXT = req.body.fichierDocument.split(".");

  if (verifierPDFouTXT.includes("pdf") || verifierPDFouTXT.includes("txt"))
    return next();
  return res
    .status(200)
    .json("Format invalide car le fichier doit être de type .txt ou .pdf");
};
module.exports = UploadControl;
