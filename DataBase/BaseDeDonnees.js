const mongoose = require("mongoose");
mongoose
  .connect(process.env.BASE_DE_DONNEES, { useNewUrlParser: true })
  .then(() => console.log(`Connection à la base de données`))
  .catch((err) =>
    console.log(`Echec de connection à la base de données \n${err.message}`)
  );
module.exports = mongoose;
