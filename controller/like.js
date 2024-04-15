const express = require('express');
const bdd = require('../models/dblike');

const router = express.Router();

// Create like on tweets
/*************************************************************************/

router.get('/like/:id', (req, res) => {
    const tweetId = req.params.id;
    const userId = req.session.user.Id_users;
    bdd.likeExists(tweetId, userId, (likeExists) => {
        if (likeExists) {
            res.redirect('/tweets');
        } else {
            bdd.createLike(tweetId, userId, () => {
                res.redirect('/tweets');
            });
        }
    });
});

// Create like on one tweet
/*************************************************************************/

router.get('/likeOne/:id', (req, res) => {
    const tweetId = req.params.id;
    const userId = req.session.user.Id_users;
    bdd.likeExists(tweetId, userId, (likeExists) => {
        if (likeExists) {
            res.redirect('/tweet/' + tweetId);
        } else {
            bdd.createLike(tweetId, userId, () => {
                res.redirect('/tweet/' + tweetId);
            });
        }
    });
});

// Delete like on tweets
/*******************************************************************/

router.get('/disLike/:id', (req, res) => {
    const tweetId = req.params.id;
    const userId = req.session.user.Id_users;
    bdd.deleteLike(tweetId, userId, () => {
        res.redirect('/tweets');
    });
});

// Delete like on one tweet
/*******************************************************************/

router.get('/disLikeOne/:id', (req, res) => {
    const tweetId = req.params.id;
    const userId = req.session.user.Id_users;
    bdd.deleteLike(tweetId, userId, () => {
        res.redirect('/tweet/' + tweetId);
    });
});


module.exports = router;