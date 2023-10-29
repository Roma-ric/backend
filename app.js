const express = require('express'); //importer le framework express
const app = express(); //Créer l'application avec le framework express
const Thing = require('./models/Things'); //importer le model 
const mongoose = require('mongoose'); //importer la base de donnée mongoose

//--------------------------------------------------------------------------------------------------
//Etablir la connnexion
mongoose.connect('mongodb+srv://romaric:intello@clusteressai.xfatgl1.mongodb.net/?retryWrites=true&w=majority',
   {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => console.log('Connexion à MongoDB réussie !'))
   .catch(() => console.log('Connexion à MongoDB échouée !'));

//--------------------------------------------------------------------------------------------------
app.use(express.json()); //Prend toutes les requêtes qui ont comme Content-Type  application/json et met à disposition leur  body  directement sur l'objet req

/* DEFINIR LES REPONSES DU SERVER APRES EXECUTION DE CHAQUE TYPE DE REQUETE */

//Definir les différentes routes, les différentes requêtes, et les différentes réponses

//Politique de sécurité CORS (Cross Origin Resource Sharing)
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
});

//------------------------------------------------------------------------------------------------
//MongoDB
app.get("/api/stuff", (req, res) => {
   res.json({ message: 'GET !' });
});

app.get("/api/stuff/:id", (req, res) => {
   res.json({ message: 'GET !' });
});

app.post('/api/stuff', (req, res, next) => {
   delete req.body._id;
   const thing = new Thing({
      ...req.body
   });
   thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
      .catch(error => res.status(400).json({ error }));
});

app.patch("/api/stuff/:id", (req, res) => {
   res.json({ message: 'PACTH !' });
});

app.put("/api/stuff/:id", (req, res) => {
   res.json({ message: 'PUT !' });
});

app.delete("/api/stuff/:id", (req, res) => {
   res.json({ message: 'DELETE !' });
});

//-------------------------------------------------------------------------------------------------
app.use("/users", (req, res, next) => { //Pour tout type de requête 
   res.json({ message: 'USER !' });  //Envoyer de réponses
   // res.status(200);               //Modifier le status de la réponse
   // next();                        //Renvoyer à la requête suivante

});

//--------------------------------------------------------------------------------------------------

module.exports = app; //Exporter l'application