const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const Ingredient = new Schema({
     name: {
         type: String,
         required: true,
         unique: true
     }
 }, {
     timestamps: true
 });

 module.exports = mongoose.model('Ingredient', Ingredient);
