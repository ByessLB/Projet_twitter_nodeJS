const express = require('express');
const bdd = require ('../models/dbfollow');

const router = express.Router();

// Create follow
/************************************************************************/

router.get ('/follow/:id', (req, res) => {
    const following = req.params.id;
    const follower = req.session.user.Id_users;
    bdd.createFollow (follower, following, () => {
        res.redirect ('/tweets');
    })
});


// Delete follow
/************************************************************************/

router.get ('/unFollow/:id', (req, res) => {
    const following = req.params.id;
    const follower = req.session.user.Id_user;
    bdd.deleteFollow (follower, following, () => {
        res.redirect ('/tweets');
    });
});

module.exports = router;