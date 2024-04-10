"# Projet_twitter_nodeJS" 

Twitter clone en Node.js
========================

Ceci est un clone de Twitter développé en Node.js, utilisant Express, EJS, MySQL et d'autres bibliothèques.

Installation
------------

Pour installer les dépendances nécessaires, exécute la commande suivante dans le dossier racine du projet :
```
npm install
```
Configuration
-------------

Pour configurer la connexion à la base de données MySQL, crée un fichier `config.js` dans le dossier `models` avec les informations de connexion appropriées :
```js
module.exports = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'twitter'
};
```
Démarrage
---------

Pour démarrer l'application, exécute la commande suivante dans le dossier racine du projet :
```
npm start
```
L'application sera accessible à l'adresse `http://localhost:8088`.

Fonctionnalités
---------------

* Inscription et connexion d'utilisateurs
* Publication de tweets
* Suivi et désabonnement d'utilisateurs
* Mise en favori et annulation de favoris de tweets
* Retweet et annulation de retweet de tweets
* Affichage de la liste de tweets, de la liste de tweets favoris et de la liste de followers/following
* Gestion des erreurs

Structure du projet
-------------------

* `controllers` : contient les contrôleurs pour les différentes routes de l'application
* `models` : contient les modèles pour les différentes entités de l'application (utilisateurs, tweets, etc.)
* `views` : contient les vues EJS pour les différentes pages de l'application
* `public` : contient les fichiers statiques (images, feuilles de style, etc.)
* `routes` : contient les routes pour les différentes fonctionnalités de l'application

Dépendances
-----------

* `bcrypt` : utilisé pour le hachage des mots de passe
* `body-parser` : utilisé pour parser les données des requêtes HTTP
* `cookie-parser` : utilisé pour parser les cookies
* `ejs` : utilisé pour le rendu des vues EJS
* `express` : utilisé pour la création du serveur web
* `express-session` : utilisé pour la gestion des sessions utilisateur
* `mysql2` : utilisé pour la connexion à la base de données MySQL

Auteur
------

[ByessLB]

Licence
-------

Ce projet est sous licence ISC. Voir le fichier `LICENSE` pour plus de détails.
