const express = require('express');
const bdd = require ('../models/dbcomment');
const router = express.Router();

// Leave a comment
/*****************************************************************************/

router.post ('/createdComment', (req, res) => {
    bdd.createComment(req.body, () => {
        res.redirect('/tweet/' + req.body.tweet);
    });
});

// Delete a comment
/*****************************************************************************/

router.get ('/deleteComment/:id', (req, res) => {
    bdd.deleteComment(req.params.id, () => {
        res.redirect('/tweets');
    });
});


module.exports = router;