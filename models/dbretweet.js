const connection = require ("./connect");

// Create retweet
/**********************************************************************/

exports.createRetweet = (tweet, userId, cb) => {
    const qr = "INSERT INTO retweets(Id_tweet, Id_users) VALUES (?, ?)";
    connection.query (
        qr,
        [tweet, userId],
        (err, rows) => {
            if (err) throw err;
            return cb (rows);
        }
    );
};

// Retweet exist
/************************************************************************/

exports.retweetExist = (tweet, userId, cb) => {
    const qr = "SELECT * FROM retweets WHERE Id_tweet = ? AND Id_users = ?";
    connection.query (
        qr,
        [tweet, userId],
        (err, rows) => {
            if (err) throw err;
            return cb (rows.length > 0);
        }
    );
};

// Get all retweet
/*************************************************************************/

exports.findAllRetweets = (cb) => {
    const qr = "SELECT * FROM retweets";
    connection.query (
        qr,
        (err, rows) => {
            if (err) throw err;
            return cb (rows);
        }
    );
};

// Get all tweets & users by retweet id
/*************************************************************************/

exports.findOneRetweet = (id, cb) => {
    const qr = "SELECT * FROM retweets INNER JOIN tweets ON retweets.Id_tweet = tweets.Id_tweet INNER JOIN users ON retweets.Id_users = users.Id_users WHERE Id_retweet = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (rows[0]);
        }
    );
};

// Get all retweet by tweet id
/*************************************************************************/

exports.findAllRetweetsByTweet = (id, cb) => {
    const qr = "SELECT * FROM retweets INNER JOIN users ON retweets.Id_users = users.Id_users WHERE Id_tweet = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (rows[0]);
        }
    );
};

// Get all retweet by user id
/*************************************************************************/

exports.findAllRetweetsByUser = (id, cb) => {
    const qr = "SELECT *FROM retweets INNER JOIN tweets ON retweets.Id_tweet = tweets.Id_tweet WHERE Id_users = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (rows[0]);
        }
    );
};


// Delete retweet
/*************************************************************************/

exports.deleteRetweet = (id, cb) => {
    const qr = "DELETE FROM retweets WHERE Id_retweet = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (null);
        }
    )
}

// Delete retweet by tweet id
/*************************************************************************/

exports.deleteRetweetByTweet = (tweet, userId, cb) => {
    const qr = "DELETE FROM retweets WHERE Id_tweet = ? AND Id_users = ?";
    connection.query (
        qr,
        [tweet, userId],
        (err, rows) => {
            if (err) throw err;
            return cb (null);
        })
}