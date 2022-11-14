const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    // L'email doit être unique
    email: {
      type: String,
      unique: true,
      required: [true, "Veuillez entrer votre adresse email"],
      match: [/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]{3,}[.]{1}[a-z]{2,10}$/, "Veuillez entrer une adresse email correcte"]
      
    },
    // enregistrement du mot de passe
    password: {
      type: String,
      required: [true, "Veuillez choisir un mot de passe"]
    }
  });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);