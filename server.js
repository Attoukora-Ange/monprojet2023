const express = require("express");
const cookie = require("cookie-parser");
require("dotenv").config();
require("./DataBase/BaseDeDonnees");
const Router_utilisateur = require("./Routes/utilisateur.routes");
const Router_admin = require("./Routes/admin.routes");

const App = express();
App.use(cookie());
App.use(express.json());

App.use("/api/admin", Router_admin);
App.use("/api/utilisateur", Router_utilisateur);

const PORT = process.env.PORT || 5000;
App.listen(PORT, () => console.log(`Server démaré au port ${PORT}`));
