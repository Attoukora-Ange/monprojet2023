const express = require("express");
const cookie = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./DataBase/BaseDeDonnees");
const Router_utilisateur = require("./Routes/utilisateur.routes");
const Router_admin = require("./Routes/admin.routes");

const App = express();
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "access_token"],
    credentials: true,
    exposedHeaders: ["access_token"],
  })
);

App.use(cookie());

App.use("/api/admin", Router_admin);
App.use("/api/utilisateur", Router_utilisateur);

const PORT = process.env.PORT || 5000;
App.listen(PORT, () => console.log(`Server démaré au port ${PORT}`));
