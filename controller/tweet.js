const express = require ('express');
const bdd = require ('../models/dbtweet');
const bdd2 = require ('../models/dbcomment');
const mime = require('mime-types');

const router = express.Router();

// All tweets
/***********************************************************************/

router.get("/tweets", (req, res) => {
    bdd.findAllTweets((rows) => {
        res.render ("tweet/tweets", { tweets : rows, mime : mime, user : req.session.user, message : "" });
    });
});

// One tweet
/**************************************************************************/

router.get("/tweet/:id", (req, res) => {
    bdd.findTweet(req.params.id, (rows) => {
        bdd2.findAllCommentsByTweet(req.params.id, (rows2) => {
            console.log(rows2);
            res.render ("tweet/tweet", { tweet : rows, comments : rows2, mime : mime, user : req.session.user})
        })
    })
})

// Create tweet
/************************************************************************/

router.get ("/creaTweet", (req, res) => {
    res.render("tweet/form", { user : req.session.user, message : ""});
});

router.post ("/createdTweet", (req, res) => {
    bdd.createTweet (req.body, (rep) => {
        if (!rep) {
            res.render ("tweet/form", { user : req.session.user, message : "Une erreur est survenue !"});
        } else {
            res.redirect ("/tweets");
        }
    })
})

// Update tweet
/*************************************************************************/

router.get ("/updateTweet/:id", (req, res) => {
    bdd.findTweet (req.params.id, (rows) => {
        res.render ("tweet/update", { user : req.session.user, tweet : rows, message : "" });
    });
});

router.post ("/updatedTweet", (req, res) => {
    bdd.updateTweet (req.body, (rep) => {
        if (!rep) {
            bdd.findTweet (req.body.id, (rows) => {
                res.render ("tweet/update", { user : req.session.user, tweet : rows, message : "Une erreur est survenue !"});
            });
        } else {
            res.redirect ("/tweets");
        }
    });
});

// Delete tweet
/***************************************************************************/

router.get ("/deleteTweet/:id", (req, res) => {
    bdd2.deleteCommentsWithtweet (req.params.id, () => {
        bdd.deleteTweet (req.params.id, () => {
            res.redirect ("/tweets");
        });
    });
});


module.exports = router;