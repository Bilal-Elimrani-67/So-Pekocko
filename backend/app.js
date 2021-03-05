const express = require("express"); // On importe Express
const bodyParser = require("body-parser"); // On importe bodyParser
const mongoose = require("mongoose"); // On importe notre modéle de données Mongoose
const path = require("path");
const helmet = require("helmet"); // On importe Helmet

const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

// Connection MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express(); // Notre application

// C.O.R.S
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Tout le monde peux y accéder
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

/*** POUR TOUTES LES ROUTES DE L'APPLICATION ***/
app.use(bodyParser.json());

app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "images")));

/*** POUR CETTE ROUTE LA ON UTILISE LE ROUTEUR DE STUFFROUTES ***/
app.use("/api/sauces", saucesRoutes);

/*** RACINE DES ROUTES LIEES A L'AUTHENTIFICATION ***/
app.use("/api/auth", userRoutes);

/*app.use((err, req, res, next) => {
  res.statut(500).send("internal error");
});*/

/*
app.post("/api/stuff", (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
     ...req.body, // ... = copier tout les champs du corps de la requête
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

/*** MODIFICATION D'UN OBJET 
app.put("/api/stuff/:id", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));     
});

/*** SUPPRESSION D'UN OBJET 
app.delete("/api/stuff/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

/*** POUR TROUVER UN SEUL OBJET 
app.get("/api/stuff/:id", (req, res, next) => {
  // :id = on récupére un thing de maniere dynamoique
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error })); 
});

/*** POUR TROUVER TOUT LES OBJETS 
app.get("/api/stuff", (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});
*/

module.exports = app;
