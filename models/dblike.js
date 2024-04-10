const connection = require ("./connect");

// Create like
/*******************************************************************/

exports.createLike = (tweet, userId, cb) => {
    const qr = " INSERT INTO likes(Id_tweet, Id_users) VALUES (?, ?)";
    connection.query (
        qr,
        [tweet, userId],
        (err, rows) => {
            if (err) throw err;
            return cb (rows);
        }
    );
};

// likes exists
/*******************************************************************/

exports.likeExists = (tweetId, userId, cb) => {
    const qr = "SELECT * FROM likes WHERE Id_tweet = ? AND Id_users = ?";
    connection.query(
        qr,
        [tweetId, userId],
        (err, rows) => {
            if (err) cb(null);
            return cb(rows.length > 0);
        }
    );
};


// Get all likes
/********************************************************************/

exports.findAllLikes = (cb) => {
    const qr = " SELECT * FROM likes";
    connection.query (
        qr,
        (err, rows) => {
            if (err) throw err;
            return cb (rows);
        }
    );
};

// Get all elements by one like
/*********************************************************************/

exports.findOneLike = (id, cb) => {
    const qr = "SELECT * FROM likes INNER JOIN tweets ON likes.Id_tweet = tweets.Id_tweet INNER JOIN users ON likes.Id_users = users.Id_users WHERE Id_like = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (rows[0]);
        }
    );
};

// Get all likes by tweet
/**********************************************************************/

exports.findAllLikesByTweet = (id, cb) => {
    const qr = "SELECT * FROM likes INNER JOIN users ON likes.Id_users = users.Id_users WHERE Id_tweet = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (rows[0]);
        }
    );
};

// Get all likes by user
/************************************************************************/

exports.findAllLikesByUser = (id, cb) => {
    const qr = "SELECT * FROM likes INNER JOIN tweets ON likes.Id_tweet = tweets.Id_tweet WHERE Id_users = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (rows[0]);
        }
    );
};

// Delete like
/*************************************************************************/

exports.deleteLike = (tweet, userId, cb) => {
    const qr = "DELETE  FROM likes WHERE Id_tweet = ? AND Id_users = ?";
    connection.query (
        qr,
        [tweet, userId],
        (err, rows) => {
            if (err) throw err;
            return cb (null);
        }
    );
};

