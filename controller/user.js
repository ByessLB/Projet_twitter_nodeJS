const express = require("express");
const bdd = require("../models/dbuser");

const router = express.Router();

// Get page connexion
/*******************************************************/

router.get("/log", (req, res) => {
  res.render("user/log");
});

// Déconnexion
/*******************************************************/

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/");
});

// Formulaire de connexion
/************************************************************************/

// Logup
/***************************************************************/

router.post("/logup", (req, res) => {
  bdd.createUser(req.body, (rep) => {
    if (!rep) {
      res.render("user/log", { error: "Cet utilisateur existe déjà." });
    } else {
      bdd.logOne(req.body, (err, user, message) => {
        if (err) {
          console.error(err);
          res.render("user/log", { error: message });
        } else {
          console.log(message);
          req.session.user = user;
          res.redirect("/");
        }
      });
    }
  });
});

// Login
/**************************************************************/

router.post("/login", (req, res) => {
  bdd.logOne(req.body, (err, user, message) => {
    if (err) {
      console.error(err);
      res.render("user/log", { error: message });
    } else {
      console.log(message);
      req.session.user = user;
      res.redirect("/");
    }
  });
});

// Get all users
/**************************************************************/

router.get("/allUsers", (req, res) => {
  bdd.findAllUsers((rows) => {
    res.render("user/users", { users: rows });
  });
});

// Get profil user
/**************************************************************/

router.get("/profil/:id", (req, res) => {
  bdd.findOneUser(req.params.id, (rows) => {
    res.render("user/profil", { user: rows });
  });
});

// Update user
/**************************************************************/

router.get("/update/:id", (req, res) => {
  let id = req.params.id;
  bdd.findOneUser(id, (rows) => {
    res.render ('user/update', { user : rows, admin : req.session.user.admin });
  });
});

router.post('/updateUser', (req, res) => {
  bdd.updateUser(req.body, () => {
    if (req.session.user.admin === 0) {
      req.session.user = req.body;
      bdd.findOneUser(req.session.user.id, (rows) => {
        console.log(req.session.user);
        res.render('user/profil', { user : rows});
      })
    } else {
        res.redirect('/allUsers');
    }
  });
});

// Delete a user
/**************************************************************/

router.get ('/delete/:id', (req, res) => {
  bdd.deleteUser(req.params.id, () => {
    if (req.session.user.admin === 0) {
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
        }
        res.redirect('/');
      });
    } else {
        res.redirect ('/allUsers');
    }
  })
})

module.exports = router;
