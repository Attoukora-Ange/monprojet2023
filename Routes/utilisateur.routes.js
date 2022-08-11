const Routes = require("express").Router();
const { body } = require("express-validator");
const controllers = require("../Controllers/controllers");
const { verifieToken } = require("../Controllers/createJwt");

//Requete GET

Routes.get("/visiteur", controllers.getVisiteur);
Routes.get("/liste/medicament", verifieToken, controllers.getListeMedicament);
Routes.get("/liste/fichier", verifieToken, controllers.getListeFichierDocument);
Routes.get("/liste/conseil", verifieToken, controllers.getConseil);
Routes.get("/liste/laboratoire", verifieToken, controllers.getLaboratoire);
Routes.get("/liste/question", verifieToken, controllers.getListeQuestion);
Routes.get("/liste/position", verifieToken, controllers.getPosition);
Routes.get("/rechercher/utilisateur", verifieToken, controllers.getListeUtilisateurRecherche);
Routes.get("/rechercher/laboratoire", verifieToken, controllers.getListeLaboratoireRecherche);
Routes.get("/rechercher/medicament", verifieToken, controllers.getUnMedicamentsRecherche);
Routes.get("/recherche/fichier/document", verifieToken, controllers.getFichierDocumentRecherche);
Routes.get("/telecharger/fichier/document/:id", verifieToken, controllers.getTelechargerFichierDocument);
Routes.get("/telecharger/fichier/document/telecharger/:id", verifieToken, controllers.getTelechargerFichierDocumentTelecharger);

Routes.get("/connecter", verifieToken, controllers.getUtilisateurConnecter);
Routes.get("/verification", controllers.getVerification);
Routes.get("/conseil/:id", verifieToken, controllers.getUnConseil);

Routes.get("/medicament/:id", verifieToken, controllers.getUnMedicaments);
Routes.get("/laboratoire/:id", verifieToken, controllers.getUnLaboratoire);

//Requete POST
Routes.post(
  "/inscription",
  //Validation des entrées avec express validator
  body("nom")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour le nom`),
  body("prenom")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour le prenom`),
  body("lieuHabitation")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour le nom lieu d'habitation`),
  body("lieuTravail")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour le lieu de travail`),
  body("telephone")
    .isLength({ min: 10, max: 10 })
    .withMessage(`310 caractères autorisé`)
    .isNumeric()
    .withMessage(`Uniquement des chiffres`),
  body("promotion")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour la promotion`),
  body("niveau")
    .isLength({ min: 2, max: 255 })
    .withMessage(`3 caractères au minimum pour le niveau`),
  body("email")
    .isEmail()
    .withMessage(`email valide uniquement`)
    .isLength({ max: 255 })
    .withMessage(`255 caractères au maximum`)
    .trim(),
  body("password")
    .isLength({ min: 4, max: 1024 })
    .withMessage(`4 caractères au minimum`)
    .trim(),
  controllers.postInscription
);
Routes.post(
  "/connexion",
  //Validation des entrées avec express validator
  body("email")
    .isEmail()
    .withMessage(`email valide uniquement`)
    .isLength({ max: 255 })
    .withMessage(`255 caractères au maximum`)
    .trim(),
  body("password").isLength({ max: 1024 }).trim(),
  controllers.postConnexion
);

Routes.post(
  "/question",
  body("nomQuestion")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour le nom`),
  body("emailQuestion")
    .isEmail()
    .withMessage(`email valide uniquement`)
    .isLength({ max: 255 })
    .withMessage(`255 caractères au maximum`)
    .trim(),
  body("question").trim(),
  controllers.postPoseQuestion
);
Routes.post("/motdepasse/reinitialise", 
body("emailReinitialisation")
    .isEmail()
    .withMessage(`email valide uniquement`)
    .isLength({ max: 255 })
    .withMessage(`255 caractères au maximum`)
    .trim(),
  controllers.postReinitialisation);
Routes.post("/motdepasse/reinitialise/code",
body("nouveauPassword")
.isLength({min: 4})
.withMessage(`4 caractères au minimum pour le mot de passe`)
.trim(), 
body("PasseGenere")
.isLength({ min: 5 })
.withMessage(`Le code généré n'est pas valide`)
.trim(), 
controllers.postCodeReinitialise)
Routes.get("/deconnexion", controllers.postDeconnexion);

//Requete PUT
Routes.put("/modifier/utilisateur",
  //Validation des entrées avec express validator
  body("nom")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour le nom`),
  body("prenom")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour le prenom`),
  body("lieuHabitation")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour le nom lieu d'habitation`),
  body("lieuTravail")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour le lieu de travail`),
  body("telephone")
    .isLength({ min: 10, max: 10 })
    .withMessage(`310 caractères autorisé`)
    .isNumeric()
    .withMessage(`Uniquement des chiffres`),
  body("promotion")
    .isLength({ min: 3, max: 255 })
    .withMessage(`3 caractères au minimum pour la promotion`),
  body("email")
    .isEmail()
    .withMessage(`email valide uniquement`)
    .isLength({ max: 255 })
    .withMessage(`255 caractères au maximum`)
    .trim(),
  verifieToken,
  controllers.putModifierUtilisateur
);
Routes.put("/modifier/motdepasse",
  body("ancienPassword")
    .isLength({ min: 4, max: 1024 })
    .withMessage(`4 caractères au minimum`)
    .trim(),
  body("nouveauPassword")
    .isLength({ min: 4, max: 1024 })
    .withMessage(`4 caractères au minimum`)
    .trim(),
  body("confirmeNouveauPassword")
    .isLength({ min: 4, max: 1024 })
    .withMessage(`4 caractères au minimum`)
    .trim(),
  verifieToken,
  controllers.putModifierMotPasse
);

//Requete DELETE
Routes.delete("/supprimer/question/:id", verifieToken, controllers.deleteQuestion);


module.exports = Routes;
