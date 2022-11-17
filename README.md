Projet 6 realisé pour la formation de Dev.Web. de Chez Openclassrooms.

Introduction


node.js tout d'abord pour initialiser le repo;

git, installation du repo sur github;

express et mongoose pour mongoDB;

helmet, dotenv, multer;

bcrypt, Json Web Tokens (JWT)

piiquante est un site d'avis gastronomiques
Nous pouvons ici poster des sauces : une route sauce est ajoutée avec un controller (un middleware);

Nous pouvons aussi y mettre des likes ou des dislikes;

Le site web est authentifiée par utilisateur et mot de passe (route auth);

Principaux modules courants de node.js utilisés ici
Node.js
Nous utilisons ici node.js pour construire le backend et ainsi ajouter les modules nécéssaires déja cités, et décrits plus bas.

Afin de lancer ce programme, si vous avez les clés du fichier .env (voire ensuite), vous devez disposer du frontend openclassrooms disponible sur https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

Dans un terminal dans le dossier du frontend, lancez "npm start".

Dans le dossier de ce backend, dans un terminal lancez "nodemon server", en ayant les clés stockées dans les variables d'environnement par mon biais. Sans cela vous n'aurez pas accès a mongoDB.

Express()
Nous utilisons express() pour la configuration du router. Express est un module de node.js et un framework JS. Express permet d'appliquer le CRUD à notre application.

Mongoose
Mongoose facilite la communication avec une base de donnée mongoDB ; mongoose est conçu pour node.js dont il est un module. Créer un schéma, appliquer le CRUD avec notre base de donnée, tout est possible avec Mongoose. Utilisation de dotenv pour securiser l'acces a mongoDB.

Multer
Multer récupère et stocke sur le serveur les fichiers envoyés par les utilisateurs. Ici, il est configuré de manière à stocker dans le dossier images/ les images de sauces proposées par chaque utilisateur.

modules de sécurité sur node.js
Dotenv
Dotenv permet de travailler avec des variables d'environnement et sécuriser les mots de passe d'un backend node.js.

Helmet
Helmet permet a l'application de respecter les recommandations OWASP.

JWT : JSON Web Tokens
JWT est un module node.js qui permet de crypter les tokens d'authentification envoyés au client pour authentifier leur session, selon une clé définie par le développeur. Cette clé est généralement stockée dans le fichier .env.

bcrypt
Bcrypt permet de faire un "hash" du mot de passe du client, de maniere a ce que cette chaine de caractère ne soit pas stockées coté serveur (mais seulement ce hash). Ainsi lorsque l'utilisateur se connecte avec son mot de passe, ce mot de passe est de nouveau haché et comparé au hash du serveur. Si les deux hash viennent du même mot de passe, les hash se reconnaitront.

Email-validator et password-validator
https://github.com/manishsaraan/email-validator pour email-validator et https://github.com/tarunbatra/password-validator pour password-validator. Les détails de l'implémentation de ces modules sont sur leur page github.
