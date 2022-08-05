const User = require("../Models/Utilisateur");
const bcrypt = require("bcryptjs");
const { validationResult, body } = require("express-validator");
const { createToken } = require("../Controllers/createJwt");
const obtenirListeMed = require("./puppertier");
const Medicament = require("../Models/Medicament");
const FichierDocument = require("../Models/Document");
const Conseil = require("../Models/Conseil");
const Laboratoire = require("../Models/Laboratoire");
const Question = require("../Models/Question");
const Position = require("../Models/Position");
const nodemailer = require("nodemailer");
const Visiteur = require("../Models/Visiteur");
const Cookies = require("cookie-parser");

//Constant de nodemailler
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILLER_EMAIL,
    pass: process.env.NODE_MAILLER_PASS,
  },
});

//Controller Obtenir la liste des utilusateurs en triant
module.exports.getListeUtilisateur = async (req, res) => {
  // const trier = req.query;
  try {
    // console.log(trier);
    const Utilisateurs = await User.find().sort({nom : 1});

    Utilisateurs.forEach((Utilisateur) => {
      if (Utilisateur == "")
        return res.status(403).json("Aucun utilisateur trouvé");
      Utilisateur.password = ""; //Vider le contenu de password
    });
    return res.status(200).json(Utilisateurs);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la modification de mot de passe`
      );
  }
};

//Controller Obtenir la liste des utilusateurs en triant
module.exports.getListeUtilisateurRecherche = async (req, res) => {
  const { nomUtilisateur } = req.query;
  if(nomUtilisateur == '')  return res.status(403).json("Veuillez entrer un nom");
  try {
    const RecherParNom = await User.find({
      nom: { $in: [nomUtilisateur] },
    });
   
    if (RecherParNom == "" ) 
      return res.status(403).json("Aucun utilisateur trouvé");
      
    return res.status(200).json(RecherParNom);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la modification de mot de passe`
      );
  }
};
module.exports.getListeLaboratoireRecherche = async (req, res) => {
  const { designation } = req.query;
  try {
    const RechercherUnExamen = await Laboratoire.find({
      designationExamen: { $in: [designation] },
    });
    if (RechercherUnExamen == "")
      return res.status(403).json("Aucun examen trouvé");
    return res.status(200).json(RechercherUnExamen);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de recherche d'un examen`
      );
  }
};
module.exports.getLaboratoire = async (req, res) => {
  try {
    const ListeLaboratoire = await Laboratoire.find();
    res.status(200).json(ListeLaboratoire);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'obtention de la liste laboratoire`
      );
  }
};
module.exports.getListeQuestion = async (req, res) => {
  try {
    const ListeQuestion = await Question.find();
    res.status(200).json(ListeQuestion);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'obtention de la liste laboratoire`
      );
  }
};

//Controller pour obtenir la liste d'un seul médicament
module.exports.getUnMedicaments = async (req, res) => {
  const { id } = req.params;
  try {
    const UnMedicament = await Medicament.findOne({ _id: id });
    console.log("Un medicament obtenue");
    res.status(200).json(UnMedicament);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'obtention d'un medicament`
      );
  }
};
module.exports.getUnLaboratoire = async (req, res) => {
  const { id } = req.params;
  try {
    const UnLabortoire = await Laboratoire.findOne({ _id: id });
    console.log("Un laboratoire obtenue");
    res.status(200).json(UnLabortoire);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'obtention de laboratoire`
      );
  }
};
module.exports.getPosition = async (req, res) => {
  try {
    const ListeDisponible = await Position.find();
    if (ListeDisponible == "")
      return res.status(200).json("Liste de position vide");
    res.status(200).json(ListeDisponible);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'obtention de position`
      );
  }
};
module.exports.getUnMedicamentsRecherche = async (req, res) => {
  const { specialite } = req.query;
  try {
    const RechercheUnMedicament = await Medicament.find({
      "Medicament.specialite": { $in: [specialite] }, 

    });
   
    if (RechercheUnMedicament == "")
      return res.status(403).json("Aucun médicament trouvé");
    console.log("Un medicament obtenue");
    res.status(200).json(RechercheUnMedicament);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'obtention de recherche de medicament`
      );
  }
};
module.exports.getFichierDocumentRecherche = async (req, res) => {
  const { typeFichier } = req.query;
  try {
    const RechercheFichierDocument = await FichierDocument.find({
      typeFichier: { $in: [typeFichier] },
    });
    if (RechercheFichierDocument == "")
      return res.status(403).json("Aucun fichier document trouvé");
    console.log("Un fichier document obtenue");
    res.status(200).json(RechercheFichierDocument);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'obtention de recherche de fichier document`
      );
  }
};

//obtenir la liste des medicaments par nombre de 5
module.exports.getListeMedicament = async (req, res) => {
  //la pagination
  const page = parseInt(req.query.page ? req.query.page : 1);
  const limit = 20;
  const debutIndex = (page - 1) * limit;
  const listeCompleteMedicament = {};
  const ToutMedicament = await Medicament.find();
  try {
    if (debutIndex > 0) {
      listeCompleteMedicament.precedent = {
        page: page - 1,
        limit: limit,
      };
    }
    if (debutIndex < ToutMedicament.length) {
      listeCompleteMedicament.suivant = {
        page: page + 1,
        limit: limit,
      };
    }
    //obtenir la liste complete de la base de données
    listeCompleteMedicament.ListeDetailMedicament = await Medicament.find()
      .limit(limit)
      .skip(debutIndex);
    console.log(listeCompleteMedicament);
    return res.status(200).json(listeCompleteMedicament);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'obtention de la liste de medicament`
      );
  }
};

//Controller obtenir la liste des fichiers du document
module.exports.getListeFichierDocument = async (req, res) => {
  let page = parseInt(req.query.page);
  const limit = 5;
  const listeCompleteFicheDocument = {};
  const debutIndex = (page - 1) * limit;

  const ToutDocument = await FichierDocument.find();

  try {
    if (debutIndex > 0) {
      listeCompleteFicheDocument.precedent = {
        page: page - 1,
        limit: limit,
      };
    }
    if (debutIndex < ToutDocument.length) {
      listeCompleteFicheDocument.suivant = {
        page: page + 1,
        limit: limit,
      };
    }

    listeCompleteFicheDocument.ListeFichierDocument =
      await FichierDocument.find().limit(limit).skip(debutIndex);
    console.log(listeCompleteFicheDocument);
    res.status(200).json(listeCompleteFicheDocument);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(`Quelque chose de mauvais s'est passé au niveau du nombre de page`);
  }
};
module.exports.getConseil = async (req, res) => {
  try {
    const obtenirListeConseil = await Conseil.find();
    res.status(200).json(obtenirListeConseil);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au de l'obtention de la liste de conseil`
      );
  }
};
module.exports.getUnConseil = async (req, res) => {
  const { id } = req.params;
  try {
    const obtenirUnConseil = await Conseil.findById(id);
    res.status(200).json(obtenirUnConseil);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au de l'obtention de la liste de conseil`
      );
  }
};

//Controller ajouter un document
module.exports.postAjouterDocument = async (req, res) => {
  if (!req.file) return res.status(200).json("Aucun fichier à ajouter");
  const fichierDocument = req.file;
  const titreDocument = req.body.titreDocument.trim();
  const typeFichier = req.body.typeFichier.trim();

  if (
    fichierDocument.mimetype != "text/plain" &&
    fichierDocument.mimetype != "application/pdf"
  )
    return res
      .status(200)
      .json("Format invalide car le fichier doit être de type .txt ou .pdf");
  try {
    const newFichierDocument = new FichierDocument({
      typeFichier,
      titreDocument,
      fichierDocument: fichierDocument.filename,
    });
    newFichierDocument.save();
    console.log(newFichierDocument);
    res.status(200).json("Fichier sauvegardé avec succes");
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la modification de mot de passe`
      );
  }
};

module.exports.postPoseQuestion = async (req, res) => {
  const { nomQuestion, emailQuestion, question } = req.body;
  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let mailOptions = {
      from: process.env.NODE_MAILLER_EMAIL,
      to: emailQuestion,
      subject: "Reponse sur la question", // Subject line
      text: question,
      html: `<b>Merci ${nomQuestion}, nous vous contacterons dans moins de 24h.</b>`, // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(200).json(`Erreur d'envoye de message`);
      } else {
        const newQuestion = new Question({
          nomQuestion,
          emailQuestion,
          question,
        });
        newQuestion.save();
        console.log("Email et question envoiyés " + info.response);
        res.status(200).json("Question envoyée avec succès");
      }
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'envoi de message`
      );
  }
};
module.exports.postPosePreponseQuestion = async (req, res) => {
  const { id } = req.params;
  const { reponseQuestion } = req.body;

  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const ReponseQuestionParVisiteur = await Question.findById(id);
    console.log(ReponseQuestionParVisiteur);

    var mailOptions = {
      from: process.env.NODE_MAILLER_EMAIL,
      to: ReponseQuestionParVisiteur.emailQuestion,
      subject: "Reponse sur la question",
      text: reponseQuestion,
      html: `<h3>Question: ${ReponseQuestionParVisiteur.question}</h3>
              <b>Reponse: ${reponseQuestion} </b>`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
        res.status(200).json(`Erreur d'envoye de message`);
      } else {
        await Question.findByIdAndUpdate(id, { reponseQuestion });
        console.log("Email et reponse envoyés " + info.response);
        res.status(200).json("Reponse envoyée avec succès");
      }
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'envoi de message`
      );
  }
};
module.exports.postAjouterConseil = async (req, res) => {
  const { titreConseil, contenueConseil, auteurConseil } = req.body;
  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newConseil = new Conseil({
      titreConseil,
      contenueConseil,
      auteurConseil,
    });
    newConseil.save();
    console.log(newConseil);
    res.status(201).json("Enregistrement du conseil avec succès");
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'ajout du conseil`
      );
  }
};
module.exports.postAjouterLaboratoire = async (req, res) => {
  const { designationExamen, prixExamen } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newLaboratoire = new Laboratoire({
      designationExamen,
      prixExamen,
    });
    newLaboratoire.save();
    res.status(201).json("Enregistrement dans le laboratoire avec succès");
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'ajout dans le laboratoire`
      );
  }
  console.log(designationExamen, prixExamen);
};
module.exports.postAjouterPosition = async (req, res) => {
  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { positionDisponible } = req.body;
    const newPosition = new Position({
      positionDisponible,
    });
    newPosition
      .save()
      .then(() => {
        res.status(200).json("Position à été ajouté avec succés");
      })
      .catch((e) => console.log(e.message));
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'ajout de position`
      );
  }
};
module.exports.postPositionDisponible = async (req, res) => {
  const { designationExamen, prixExamen } = req.body;
};
module.exports.putAjouterAssurance = async (req, res) => {
  const { id } = req.params;
  const { contenueAssurance } = req.body; //obtenue à partir du formulaire
  const idTable = 0; //pour obtenir le premier element du tableau
  let unSeulProduit = {}; //pour ajouter des proprites au resultat de medicament
  const assurance = null;

  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const tabeMedicamentTrouver = await Medicament.findOne({ _id: id });
    unSeulProduit = tabeMedicamentTrouver.Medicament[idTable];
    unSeulProduit.assurance = contenueAssurance;
    await Medicament.findByIdAndUpdate(id, {
      Medicament: { ...unSeulProduit },
    });
    res.status(200).json(unSeulProduit);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la modification de mot de passe`
      );
  }
};
module.exports.postReinitialisation = async (req, res) => {
  const PasseGenere = Math.floor(Math.random() * 1000000 + 1);
  const { emailReinitialisation } = req.body;
  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const MotPasseOublie = await User.findOne({ email: emailReinitialisation });
    if (!MotPasseOublie)
      return res
        .status(203)
        .json(`Aucun utilisateur n'a été trouvé avec cette adresse email`);

    var mailOptions = {
      from: process.env.NODE_MAILLER_EMAIL,
      to: emailReinitialisation,
      subject: "Réinitialisation de mot de passe",
      html: `<h3>Bonjour ${MotPasseOublie.nom}, pour réinitialiser votre mot de passe,
       veuillez entrer ce code : ${PasseGenere}`,
    };
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
        res.status(203).json(`Erreur d'envoye de message`);
      } else {
        console.log("Email et reponse envoyés " + info.response);
        res.cookie("idutilisateuroublie", MotPasseOublie._id);
        await User.findByIdAndUpdate(MotPasseOublie._id, { PasseGenere });
        res
          .status(200)
          .json("Votre code a été envoyé à l'adresse email avec succès");
      }
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la réinitialisation de mot de passe`
      );
  }
};
module.exports.postCodeReinitialise = async (req, res) => {
  const { idutilisateuroublie } = req.cookies;
  const { PasseGenere, nouveauPassword } = req.body;
  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const utilisateurMotPasseOublier = await User.findById(idutilisateuroublie);
    if (!utilisateurMotPasseOublier)
      return res.status(200).json(`Aucun utilisateur n'a été trouvé`);
    if (utilisateurMotPasseOublier.PasseGenere != PasseGenere)
      return res
        .status(203)
        .json(
          `Le code entré est incorrect, veuillez entrer le bon code envoyé par email`
        );
    console.log(utilisateurMotPasseOublier);

    const genSaltSync = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(nouveauPassword, genSaltSync);

    await User.findByIdAndUpdate(idutilisateuroublie, {
      password,
      PasseGenere: "",
    });
    console.log(utilisateurMotPasseOublier);
    res.status(200).json("Le mot de passe à été réinitialisé avec succès");
  } catch (error) {}
};

//Modier un utilisateur
module.exports.putModifierUtilisateur = async (req, res) => {
  const idUtilisateur = req.user;
  let {
    nom,
    prenom,
    lieuHabitation,
    lieuTravail,
    niveau,
    telephone,
    promotion,
    email,
  } = req.body;

  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //Rechercher id d'un utilisateur connecter et modifier ces informations
    await User.findByIdAndUpdate(idUtilisateur, {
      nom,
      prenom,
      lieuHabitation,
      lieuTravail,
      niveau,
      telephone,
      promotion,
      email,
    });

    res.status(200).json("Vos informations ont bien été mis à jour");
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la modification de mot de passe`
      );
  }
};
module.exports.putConseil = async (req, res) => {
  const { id } = req.params;
  const { titreConseil, contenueConseil, auteurConseil } = req.body;
  try {
    const modifierConseil = await Conseil.findByIdAndUpdate(id, {
      titreConseil,
      contenueConseil,
      auteurConseil,
    });
    console.log(modifierConseil);
    res.status(200).json(modifierConseil);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la modification conseil`
      );
  }
};
//Creer un medicament a partir du wrapper
module.exports.postCreerPremierMedicament = async (req, res) => {
  //creer un nouveau tableau de medicament dans le base de données
  let tableauPremierMedicament = null;
  try {
    for (let i = 1; i < 3; i++) {
      tableauPremierMedicament = await obtenirListeMed(i);
      tableauPremierMedicament.forEach((tableMedicamaent) => {
        const newMedicament = new Medicament({
          Medicament: { ...tableMedicamaent },
        });
        newMedicament
          .save()
          .then(() =>
            console.log("Medicament ajouté avec succès dans la base de données")
          );
      });
    }
  } catch (error) {
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la modification de mot de passe`
      );
  }

  return res.status(200).json(tableauPremierMedicament);
};

//Inscription d'un utilisateur
module.exports.postInscription = async (req, res) => {
  const verify = Math.floor(Math.random() * 10000000 + 1);

  let { password, confPassword, ...others } = req.body;

  console.log(password, confPassword, others);
  //Capture des erreur au cours de la validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    if (password != confPassword)
      return res
        .status(203)
        .json(`Le mot de passe et la confirmation ne sont pas identique`);

    //On verifie si l'email existe déja avant de l'enregister
    const existeEmail = await User.findOne({ email: others.email });
    if (existeEmail)
      return res
        .status(203)
        .json(`L'email existe déja, veuillez choisir un autre`);

    /////////////////////////////////////////////////
    let mailOptions = {
      from: process.env.NODE_MAILLER_EMAIL,
      to: others.email,
      subject: "Confirmation d'inscription", // Subject line
      html: `<h2>Bonjour ${others.nom}, vous êtes déja inscrit.</h2>
    <h3>Pour activer votre compte sur le site PHARMA 36,
    veuillez cliquer sur ce lien:
    <br/>
      <a target='_' href='${process.env.DOMAINE}/activation/verification/${verify}'> CLICK ICI POUR ACTIVER LE COMPTE </a></p>
    </h3>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(203).json(`Erreur d'envoye de message`);
      } else {
        //Quand tous les champs sont bien remplis
        const hash = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, hash);

        if (others.email == process.env.NODE_MAILLER_EMAIL) {
          console.log("Administrateur");
          const newUser = new User({
            ...others,
            password,
            nombreVisite: 0,
            verification: verify,
            utilisateur: false,
            admin: true,
          });
          newUser
            .save()
            .then(() => {
              res.cookie("info_utilisateur", newUser._id);
              console.log(newUser._id);
              console.log(`Nouvel utilisateur enregisté avec success`);
              return res
                .status(200)
                .json(
                  `Votre compte a été crée avec succès, vous avez réçu un email pour l'activer`
                );
            })
            .catch((err) => {
              //En cas d'existence d'un utilisateur
              console.log(
                `Erreur d'enregistrement d'un nouvel utilisateur \n${err.message}`
              );
              console.log("Email et question envoiyés " + info.response);
              return res
                .status(400)
                .json(`Erreur d'enregistrement d'un nouvel`);
            });
        } else {
          console.log("Utilisateur");
          const newUser = new User({
            ...others,
            password,
            nombreVisite: 0,
            verification: verify,
            utilisateur: true,
            admin: false,
          });
          newUser
            .save()
            .then(() => {
              res.cookie("info_utilisateur", newUser._id);
              console.log(newUser._id);
              console.log(`Nouvel utilisateur enregisté avec success`);
              return res
                .status(200)
                .json(
                  `Votre compte a été crée avec succès. Vous avez réçu un email pour l'activer`
                );
            })
            .catch((err) => {
              //En cas d'existence d'un utilisateur
              console.log(
                `Erreur d'enregistrement d'un nouvel utilisateur \n${err.message}`
              );
              console.log("Email et question envoiyés " + info.response);
              return res
                .status(400)
                .json(`Erreur d'enregistrement d'un nouvel`);
            });
        }
      }
    });

    ////////////////////////////////////////////////
  } catch (error) {
    //Erreur au niveau du server
    res
      .status(500)
      .json(`Quelques choses de mauvais s'est passé au cours de l'inscription`);
    console.log(error);
  }
};

//Connexion d'un utilisateur
module.exports.postConnexion = async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  console.log(userEmail, userPassword);
  //Capture des erreur au cours de la validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //On verifie si l'email existe déja avant de l'enregister
    const existeEmail = await User.findOne({ email: userEmail });
    if (!existeEmail) return res.status(203).json(`L'email n'existe pas`);

    //Si l'utilisateur (email) existe, on verifie le mot de passe
    const verifiePassword = bcrypt.compareSync(
      userPassword,
      existeEmail.password
    );
    if (!verifiePassword)
      return res.status(203).json(`Le mot de passe n'existe pas`);
    const activation = await User.findOne({ email: userEmail });
    if (!activation.active)
      return res
        .status(203)
        .json(
          `Votre compte n'est pas encore activé. Vous devez l'activer à partir du lien envoyé sur votre compte`
        );
    //Quand l'utilisateur est authentifié, on crée le JWT
    const { password, active, PasseGenere, verification, ...payload } =
      existeEmail._doc;
    const token = createToken(payload);
    console.log(token);
    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 180 * 1), //second min hour days year
      // secure: true,
      path: "/",
      httpOnly: true, // backend only
      sameSite: "strict", // set to none for cross-request
    });

    const totalNombreVisiteur = await Visiteur.findOne();
    const totalNombrePersonne = await User.findOne({ email: userEmail });

    if (totalNombreVisiteur == null) {
      const nombreVisiteurConecte = 1;
      const newVisiteur = new Visiteur({
        nombreVisiteurConecte,
      });
      newVisiteur.save();
    } else {
      totalNombrePersonne.nombreVisite += 1;
      totalNombreVisiteur.nombreVisiteurConecte += 1;

      const nombreVisiteurConecte = totalNombreVisiteur.nombreVisiteurConecte;
      const nombreVisite = totalNombrePersonne.nombreVisite;
      await Visiteur.findByIdAndUpdate(totalNombreVisiteur._id, {
        nombreVisiteurConecte,
      });
      await User.findByIdAndUpdate(totalNombrePersonne._id, { nombreVisite });
    }
    return res.status(200).json("Vous êtes bien authentifié");
  } catch (error) {
    //Erreur au niveau du server
    res
      .status(500)
      .json(`Quelques choses de mauvais s'est passé au cours de la connexion`);
    console.log(error);
  }
};

//Deconnexion d'un utilisateur
module.exports.postDeconnexion = (req, res) => {
  try {
    //Suppresion du token donc deconnexion de l'utilisateur
    res.clearCookie("access_token");
    // res.cookie("access_token", "");
    return res.status(200).json("Vous avez été déconnécté");
  } catch (error) {
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la deconnexion`
      );
  }
};

//Modifier un utilisateur
module.exports.getUtilisateurConnecter = async (req, res) => {
  const idUtilisateur = req.user;
  try {
    const modifierUtilisateur = await User.findOne(idUtilisateur);

    const { password, ...other } = modifierUtilisateur._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la connection d'un utilisateur connecté`
      );
  }
};
module.exports.getVerification = async (req, res) => {
  const { verify } = req.query;
  const id = req.cookies.info_utilisateur;
  console.log(verify);
  console.log(req.cookies.info_utilisateur);
  if (!verify)
    return res
      .status(403)
      .json("Le compte n'a pas été trouvé pendant la vérification");
  try {
    const verifierInscription = await User.findOne({ _id: id });
    if (!verifierInscription)
      return res
        .status(403)
        .json("Le compte n'a pas été trouvé pendant la vérification");
    console.log(verifierInscription);
    if (verifierInscription.verification == null)
      return res.status(403).json("Erreur pendant la vérification");
    if (verify != verifierInscription.verification)
      return res
        .status(403)
        .json(`Ce lien avec l'identifiant ${verify} n'est plus valide, veuillez contacter l'administrateur par email`);

    const activeUtilisateur = await User.findByIdAndUpdate(id, {
      active: true,
    });
    console.log("Verification avec succes");
    console.log(activeUtilisateur);

    await User.findByIdAndUpdate(id, { verification: "" });
    console.log(activeUtilisateur);
    res.status(200).json("Votre compte a été activé avec succès");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la vérifcation de l'inscription`
      );
  }
};
module.exports.getUnUtilisateur = async (req, res) => {
  const { id } = req.params;
  console.log("lalongueur " + id)
  try {
    const UnUtilisateur = await User.findOne({ _id: id });
    const { password, ...other } = UnUtilisateur._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de l'obtention de l'utilisateur`
      );
  }
};
module.exports.putLaboratoire = async (req, res) => {
  const { id } = req.params;
  const { designationExamen, prixExamen } = req.body;

  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const UnLabortoire = await Laboratoire.findByIdAndUpdate(id, {
      designationExamen,
      prixExamen,
    });
    console.log(UnLabortoire);
    res.status(200).json("Modification de laboratoire avec succès");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la modification du laboratoire`
      );
  }
};
module.exports.putUtilisateur = async (req, res) => {
  const { id } = req.params;
  const { utilisateur, admin } = req.body;
  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const UtilisateurStatut = await User.findByIdAndUpdate(id, {
      utilisateur,
      admin,
    });
    console.log(UtilisateurStatut);
    res
      .status(200)
      .json(`Le statut de ${UtilisateurStatut.nom} a été modifié avec succès`);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la modification du statut`
      );
  }
};
module.exports.putPosition = async (req, res) => {
  const { id } = req.params;
  const { positionDisponible } = req.body;
  console.log(positionDisponible);
  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const position = await Position.findByIdAndUpdate(id, {
      positionDisponible,
    });
    console.log(position);
    res.status(200).json("Modification de position disponible avec succès");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la modification de position disponible`
      );
  }
};

//Modifier le mot de passe d'un utilisateur
module.exports.putModifierMotPasse = async (req, res) => {
  const idUtilisateur = req.user;
  let { ancienPassword, nouveauPassword, confirmeNouveauPassword } = req.body;
  const saltPassword = 10;
  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Rechercher id d'un utilisateur connecter

  try {
    const modifierUtilisateur = await User.findOne(idUtilisateur);
    const { password } = modifierUtilisateur._doc;
    const verifiePassword = await bcrypt.compare(ancienPassword, password);
    // Vérifier et modifier sont mot de passe
    if (!ancienPassword || !nouveauPassword || !confirmeNouveauPassword)
      return res.status(200).json("Un des champs est vide");
    if (!verifiePassword)
      return res.status(200).json("Votre ancien mot de passe est incorrect");
    if (nouveauPassword != confirmeNouveauPassword)
      return res
        .status(200)
        .json(
          "Le nouveau mot de passe est différent de la confirmation de mot de passe"
        );
    nouveauPassword = bcrypt.hashSync(nouveauPassword, saltPassword);

    //Enregistrer le mot de passe modifié dans la base de données
    await User.findByIdAndUpdate(idUtilisateur, { password: nouveauPassword });
    res.status(200).json("Votre mot de passe à été modifié avec succès");
  } catch (error) {
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la modification de mot de passe`
      );
    console.log(error.message);
  }
};

module.exports.deleteConseil = async (req, res) => {
  const { id } = req.params;
  try {
    const SupprimerConseil = await Conseil.findByIdAndDelete(id);
    console.log(SupprimerConseil);
    if (SupprimerConseil == null)
      return res
        .status(200)
        .json(`L'idenfifiant ${id} n'existe pas ou est incorrect`);
    res.status(200).json("Conseil supprimé avec succès");
  } catch (error) {
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la suppression du conseil`
      );
    console.log(error.message);
  }
};
module.exports.deleteLaboratoire = async (req, res) => {
  const { id } = req.params;
  try {
    const SupprimerLaboratoire = await Laboratoire.findByIdAndDelete(id);
    console.log(SupprimerLaboratoire);
    if (SupprimerLaboratoire == null)
      return res
        .status(200)
        .json(`L'idenfifiant ${id} n'existe pas ou est incorrect`);
    res.status(200).json("Un examen de laboratoire supprimé avec succès");
  } catch (error) {
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la suppression du conseil`
      );
    console.log(error.message);
  }
};
module.exports.deleteUtilisateur = async (req, res) => {
  const { id } = req.params;
  try {
    const SupprimerUtilisateur = await User.findByIdAndDelete(id);
    console.log(SupprimerUtilisateur);
    if (SupprimerUtilisateur == null)
      return res
        .status(200)
        .json(`L'idenfifiant ${id} n'existe pas ou est incorrect`);
    res.status(200).json("Utilisateur supprimé avec succès");
  } catch (error) {
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la suppression de l'utilisateur`
      );
    console.log(error.message);
  }
};
module.exports.deleteMedicament = async (req, res) => {
  const { id } = req.params;
  try {
    const SupprimerMedicament = await Medicament.findByIdAndDelete(id);
    console.log(SupprimerMedicament);
    if (SupprimerMedicament == null)
      return res
        .status(200)
        .json(`L'idenfifiant ${id} n'existe pas ou est incorrect`);
    res.status(200).json("Medicament supprimé avec succès");
  } catch (error) {
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la suppression de l'utilisateur`
      );
    console.log(error.message);
  }
};
module.exports.deleteFichierDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const SupprimerFichierDocument = await FichierDocument.findByIdAndDelete(
      id
    );
    console.log(SupprimerFichierDocument);
    if (SupprimerFichierDocument == null)
      return res
        .status(200)
        .json(`L'idenfifiant ${id} n'existe pas ou est incorrect`);
    res.status(200).json("Fichier document supprimé avec succès");
  } catch (error) {
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la suppression de l'utilisateur`
      );
    console.log(error.message);
  }
};
module.exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const SupprimerQuestion = await Question.findByIdAndDelete(id);
    console.log(SupprimerQuestion);
    if (SupprimerQuestion == null)
      return res
        .status(200)
        .json(`L'idenfifiant ${id} n'existe pas ou est incorrect`);
    res.status(200).json("Question supprimée avec succès");
  } catch (error) {
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la suppression de l'utilisateur`
      );
    console.log(error.message);
  }
};
module.exports.deleteReponseQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const SupprimerReponseQuestion = await Question.findById(id);
    SupprimerReponseQuestion.reponseQuestion = "";

    if (SupprimerReponseQuestion.reponseQuestion == "") {
      await Question.findByIdAndUpdate(id, {
        reponseQuestion: SupprimerReponseQuestion.reponseQuestion,
      });
      return res
        .status(200)
        .json(`La réponse de la question ${id} à été supprimé avec succès`);
    } else {
      return res.status(200).json("Reponse n'a pas été supprimée");
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la suppression de la reponse de question`
      );
  }
};
module.exports.deletePosition = async (req, res) => {
  const { id } = req.params;
  try {
    await Position.findByIdAndDelete(id);
    return res.status(200).json(`La position à été supprimé avec succès`);
  } catch (error) {
    res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la suppression de la reponse de question`
      );
    console.log(error.message);
  }
};
