const connection = require ('./connect');

// Create comment
/*********************************************************************************/

exports.createComment = (com, cb) => {
    const qr = "INSERT INTO comment (comment, Id_tweet, Id_users) VALUES (?, ?, ?)";
    connection.query (
        qr,
        [com.comment, com.tweet, com.user],
        (err, rows) => {
            if (err) throw err;
            return cb (rows[0]);
        }
    );
};

// Get all comments by tweet
/******************************************************************************/

exports.findAllCommentsByTweet = (id, cb) => {
    const qr = " SELECT * FROM comment INNER JOIN users ON comment.Id_users = users.Id_users WHERE Id_tweet = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (rows);
        }
    );
};

// Get all comments by user
/******************************************************************************/

exports.findAllCommentsByUser = (id, cb) => {
    const qr = " SELECT * FROM comment INNER JOIN tweets ON comment.Id_tweet = tweets.Id_tweet WHERE Id_users = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (rows);
        }
    );
};

// Get one comment
/******************************************************************************/

exports.findOneComment = (id, cb) => {
    const qr = " SELECT * FROM comment INNER JOIN tweets ON comment.Id_tweet = tweets.Id_tweet INNER JOIN users ON comment.Id_users = users.Id_users WHERE Id_comment = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (rows[0]);
        }
    );
};

// Update comment
/******************************************************************************/

exports.updateComment = (com, cb) => {
    const qr = " UPDATE comment SET comment = ? WHERE Id_comment = ? ";
    connection.query (
        qr,
        [com.comment, com.Id_comment],
        (err, rows) => {
            if (err) throw err;
            return cb (rows);
        }
    );
};

// Delete comment
/******************************************************************************/

exports.deleteComment = (id, cb) => {
    const qr = " DELETE FROM comment WHERE Id_comment = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (null);
        }
    );
};

// Delete comments with Id_tweet
/*******************************************************************************/

exports.deleteCommentsWithtweet = (id, cb) => {
    const qr = "DELETE FROM comment WHERE Id_tweet = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (null);
        }
    );
};