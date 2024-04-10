const connection = require ("./connect");

// Create tweet
/*******************************************************************/

exports.createTweet = (tweet, cb) => {
    const qr = "INSERT INTO tweets(content, Id_users, media) VALUES (?, ?, ?)";
    connection.query(qr, [tweet.content, tweet.id, tweet.media], (err, rows) => {
        if (err) throw err;
        return cb(rows);
    });
};

// Get all tweets
/********************************************************************/

exports.findAllTweets = (cb) => {
    const qr = "SELECT tweets.*, users.*, COUNT(likes.Id_tweet) AS likes_count, COUNT(retweets.Id_tweet) AS retweets_count, COUNT(followers.follower_id) AS followers_count FROM tweets INNER JOIN users ON tweets.Id_users = users.Id_users LEFT JOIN likes ON tweets.Id_tweet = likes.Id_tweet LEFT JOIN retweets ON tweets.Id_tweet = retweets.Id_tweet LEFT JOIN followers ON followers.following_id = users.Id_users GROUP BY tweets.Id_tweet, users.Id_users";
    connection.query(qr, (err, rows) => {
        if (err) throw err;
        return cb(rows);
    });
};

// Get all tweets by user id
/*********************************************************************/

exports.findAllTweetsByUser = (id, cb) => {
    const qr = "SELECT * FROM tweets INNER JOIN users ON tweets.Id_users = users.Id_users WHERE Id_users = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (rows[0]);
        }
    );
};

// Get one tweet
/*********************************************************************/

exports.findTweet = (id, cb) => {
    const qr = "SELECT * FROM tweets INNER JOIN users ON tweets.Id_users = users.Id_users WHERE Id_tweet = ?";
    connection.query(qr, [id], (err, rows) => {
        if (err) throw err;
        return cb(rows[0]);
    });
};

//Update tweet
/*********************************************************************/

exports.updateTweet = (tweet, cb) => {
    const qr = "UPDATE tweets SET content = ?, media = ? WHERE Id_tweet = ?";
    connection.query (
        qr,
        [tweet.content, tweet.media, tweet.id],
        (err, rows) => {
            if (err) throw err;
            return cb (rows);
        }
    )
};

// Delete tweet
/*********************************************************************/

exports.deleteTweet = (id, cb) => {
    const qr = "DELETE FROM tweets WHERE Id_tweet = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (null);
        }
    );
};