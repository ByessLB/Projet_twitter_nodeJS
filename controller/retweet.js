const express = require ("express");
const bdd = require ('../models/dbretweet');

const router = express.Router();

// Create retweet
/***********************************************************************/

router.get ('/retweet/:id', (req, res) => {
    const tweet = req.params.id;
    const user = req.session.user.Id_users;
    bdd.retweetExist(tweet, user, (exist) => {
        if (exist) {
            res.redirect('/tweets');
        } else {
            bdd.createRetweet(tweet, user, () => {
                res.redirect ('/tweets');
            });
        }
    });
});

// Un retweet
/***********************************************************************/

router.get ('/unRetweet/:id', (req, res) => {
    const tweet = req.params.id;
    const user = req.session.user.Id_users;
    bdd.deleteRetweetByTweet(tweet, user, () => {
        res.redirect ('/tweets');
    });
});

module.exports = router;