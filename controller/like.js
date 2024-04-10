const express = require('express');
const bdd = require('../models/dblike');

const router = express.Router();

// Create like
/*************************************************************************/

router.get('/like/:id', (req, res) => {
    const tweetId = req.params.id;
    const userId = req.session.user.Id_users;
    bdd.likeExists(tweetId, userId, (likeExists) => {
        if (likeExists) {
            // console.log("OUULAAAAA!!")
            res.redirect('/tweets');
        } else {
            bdd.createLike(tweetId, userId, () => {
                // console.log("OLE!!")
                res.redirect('/tweets');
            });
        }
    });
});

// Delete like
/*******************************************************************/

router.get('/disLike/:id', (req, res) => {
    const tweetId = req.params.id;
    const userId = req.session.user.Id_users;
    bdd.deleteLike(tweetId, userId, () => {
        res.redirect('/tweets');
    });
});


module.exports = router;