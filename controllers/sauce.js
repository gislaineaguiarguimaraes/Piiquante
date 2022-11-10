// on récupére le model mongoose pour nos sauces 
const Sauce = require('../models/Sauce');
// Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs');

// Crée une sauce - ok
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    
    
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauce.save()
        .then(()=> res.status(201).json({message: 'Sauce enregistré !'}))
        .catch(error => res.status(400).json({error}));
};

// Modifie une sauce - ok
exports.modifySauce = (req, res, next)=>{
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };

    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) =>{
            if(sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else{
                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                .then(()=> res.status(200).json({message: 'Sauce modifiée !'}))
                .catch(error => res.status(401).json({error}));
            }
        })
        .catch((error)=>{
            res.status(400).json({ error });
        });
};
//Supprime une sauce
exports.deleteSauce = (req, res, next)=>{
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            if(sauce.userId != req.auth.userId){
                res.status(401).json({message: 'Not authorized'});
            } else{
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(()=> res.status(200).json({message: 'Sauce supprimée !'}))
                        .catch(error => res.status(400).json({error}));
                });
            }
        })
        .catch(error => {
            res.status(400).json({error})
        });
};

// Affiche une sauce quand on clique dessus
exports.getOneSauce = (req, res, next)=>{
    Sauce.findOne({_id: req.params.id})
      .then(sauce => {
        console.log(sauce);
        res.status(200).json(sauce);
    })
      .catch(error => res.status(404).json({error}));
};

// Affiche toutes les sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};

// Like et dislike sauce
exports.likeSauce = (req, res, next) => {
    const like = req.body.like; 
    const userId = req.body.userId;
    
    Sauce.findOne({ _id: req.params.id }) 
    .then(sauce => {
      switch (like) {
        case 1: // cas n°1 : like = 1
        if ( sauce.usersLiked.includes(userId) ) { 
          alert('message: votre sauce est déjà enregistré dans vos likes');
        } else { 
          Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 },  $push: { usersLiked: userId } })
        // $inc est une fonction mongoose qui permet d'incrémenter & $push permet d'ajouter une donnée dans un tableau
          .then(() => res.status(200).json({ message : 'Like ajouté !'}))
          .catch(error => res.status(400).json({ error }));
        }
        break;
  
        case -1:
        if ( sauce.usersDisliked.includes(userId) ) {
          alert('message: votre sauce est déjà enregistré dans vos disLikes');
        } else {
          Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 },  $push: { usersDisliked: userId } })
          .then(() => res.status(200).json({ message : 'Dislike ajouté !'}))
          .catch(error => res.status(400).json({ error }));
        }
        break;
  
        case 0:
        if ( sauce.usersLiked.includes(userId) ) {
          Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1},  $pull: { usersLiked: userId } })
          .then(() => res.status(200).json({ message : 'Like retiré !'}))
          .catch(error => res.status(400).json({ error }));
        } else {
          Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1},  $pull: { usersDisliked: userId } })
          .then(() => res.status(200).json({ message : 'Like retiré !'}))
          .catch(error => res.status(400).json({ error }));
        }  
      }
    })
    .catch(error => res.status(400).json({ error }));
  
};