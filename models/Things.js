const mongoose = require('mongoose');

//Creer le schema des données d'une entité 
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

//Exporter le schema en tant que model avec un nom
module.exports = mongoose.model('Thing', thingSchema);