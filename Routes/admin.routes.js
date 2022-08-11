const Routes = require("express").Router();
const { body } = require("express-validator");
const controllers = require("../Controllers/controllers");
const { verifieToken } = require("../Controllers/createJwt");
const multer = require("multer");

//Uploader une image
const stockage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("first");
    cb(null, "./Fichier");
  },
  filename: (req, file, cb) => {
    if (file.mimetype != "text/plain" && file.mimetype != "application/pdf")
      return -1;

    cb(null, file.originalname.split(" ").join("_"));
  },
});

const upload = multer({ storage: stockage });

//Requete GET
Routes.get("/conseil/:id", verifieToken, controllers.getUnConseil);
Routes.get("/utilisateur/:id", verifieToken, controllers.getUnUtilisateur);
Routes.get("/laboratoire/:id", verifieToken, controllers.getUnLaboratoire);
Routes.get("/utilisateur/:id", verifieToken, controllers.getUnUtilisateur);
Routes.get("/liste/utilisateur", verifieToken, controllers.getListeUtilisateur);
Routes.get(
  "/rechercher/utilisateur",
  verifieToken,
  controllers.getListeUtilisateurRecherche
);

//Requete POST
Routes.post(
  "/ajouter/conseil",
  body("titreConseil")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour le titre du conseil`),
  body("contenueConseil")
    .isLength({ min: 3 })
    .withMessage(`3 caractères au minimum pour le contenue du conseil`),
  body("auteurConseil")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour l'auteur du conseil`),
  verifieToken,
  controllers.postAjouterConseil
);
Routes.post(
  "/ajouter/document",
  verifieToken,

  upload.single("fichierDocument"),
  controllers.postAjouterDocument
);

Routes.post(
  "/ajouter/medicament",
  verifieToken,
  controllers.postCreerPremierMedicament
);
Routes.post(
  "/ajouter/examen/laboratoire",
  body("nomLaboratoire")
    .isLength({ min: 2, max: 255 })
    .withMessage(`2 caractères au minimum pour le nom du laboratoire`),
  body("designationExamen")
    .isLength({ min: 2, max: 255 })
    .withMessage(`2 caractères au minimum pour la désignation`),
  body("prixExamen")
    .isLength({ min: 1, max: 15 })
    .withMessage(`1 caractères au minimum pour le prix de l'examen`),
  verifieToken,
  controllers.postAjouterLaboratoire
);
Routes.post(
  "/ajouter/position",
  body("positionDisponible")
    .isLength({ min: 10 })
    .withMessage(`10 caractères au minimum pour la position disponible`),
  verifieToken,
  controllers.postAjouterPosition
);

//Requete PUT
Routes.put(
  "/reponse/question/:id",
  body("reponseQuestion").trim(),
  controllers.postPosePreponseQuestion
);
Routes.put(
  "/utilisateur/:id",
  body("utilisateur")
    .isBoolean()
    .withMessage(`Le format d'utilisateur est non valide`),
  body("admin")
    .isBoolean()
    .withMessage(`Le format d'adminitrateur est non valide`),
  controllers.putUtilisateur
);
Routes.put(
  "/modifier/assurance/:id",
  body("contenueAssurance")
    .isLength({ min: 10 })
    .withMessage(`10 caractères au minimum pour le contenue assurance`),
  verifieToken,
  controllers.putAjouterAssurance
);
Routes.put(
  "/modifier/conseil/:id",
  body("titreConseil")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour le titre du conseil`),
  body("contenueConseil")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour le contenue du conseil`),
  body("auteurConseil")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour l'auteur du conseil`),
  verifieToken,
  controllers.putConseil
);
Routes.put(
  "/modifier/laboratoire/:id",
  body("designationExamen")
    .isLength({ min: 2, max: 255 })
    .withMessage(`2 caractères au minimum pour la désignation`),
  verifieToken,
  controllers.putLaboratoire
);
Routes.put(
  "/modifier/position/:id",
  body("positionDisponible")
    .isLength({ min: 10 })
    .withMessage(`10 caractères au minimum pour la position disponible`),
  verifieToken,
  controllers.putPosition
);

//Requete DELETE
Routes.delete(
  "/supprimer/conseil/:id",
  verifieToken,
  controllers.deleteConseil
);
Routes.delete(
  "/supprimer/laboratoire/:id",
  verifieToken,
  controllers.deleteLaboratoire
);
Routes.delete(
  "/supprimer/utilisateur/:id",
  verifieToken,
  controllers.deleteUtilisateur
);
Routes.delete(
  "/supprimer/medicament/:id",
  verifieToken,
  controllers.deleteMedicament
);
Routes.delete(
  "/supprimer/fichier/document/:id",
  verifieToken,
  controllers.deleteFichierDocument
);
Routes.delete(
  "/supprimer/question/:id",
  verifieToken,
  controllers.deleteQuestion
);
Routes.delete(
  "/supprimer/reponse/:id",
  verifieToken,
  controllers.deleteReponseQuestion
);
Routes.delete(
  "/supprimer/position/:id",
  verifieToken,
  controllers.deletePosition
);

module.exports = Routes;
