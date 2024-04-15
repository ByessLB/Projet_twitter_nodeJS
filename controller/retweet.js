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

// Create retweet on one tweet
/***********************************************************************/

router.get ('/retweetOne/:id', (req, res) => {
    const tweet = req.params.id;
    const user = req.session.user.Id_users;
    bdd.retweetExist(tweet, user, (exist) => {
        if (exist) {
            res.redirect('/tweet/' + tweet);
        } else {
            bdd.createRetweet(tweet, user, () => {
                res.redirect ('/tweet/' + tweet);
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

// Un retweet on one tweet
/***********************************************************************/

router.get ('/unRetweetOne/:id', (req, res) => {
    const tweet = req.params.id;
    const user = req.session.user.Id_users;
    bdd.deleteRetweetByTweet(tweet, user, () => {
        res.redirect ('/tweet/' + tweet);
    });
});

module.exports = router;