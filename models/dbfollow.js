const connection = require ("./connect");

// Create follow
/************************************************************************/

exports.createFollow = (follower, following, cb) => {
    const qr = "INSERT INTO followers(follower_id, following_id) VALUES (?, ?)";
    connection.query (
        qr,
        [follower, following],
        (err, rows) => {
            if (err) throw err;
            return cb (rows);
        }
    );
};

// Follow exist
/************************************************************************/

exports.followExist = (follower, following, cb) => {
    const qr = "SELECT * FROM followers WHERE follower_id = ?, AND following_id = ?";
    connection.query(
        qr,
        [follower, following],
        (err, rows) => {
            if (err) throw err;
            return cb (rows.length > 0);
        }
    );
};

// Get all follows by follower
/************************************************************************/

exports.findAllFollowsByFollower = (id, cb) => {
    const qr = "SELECT * FROM followers INNER JOIN users ON followers.following_id = users.Id_users WHERE follower_id = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return  cb (rows[0]);
        }
    );
};

// Get all follows by following
/************************************************************************/

exports.findAllFollowsByFollowing = (id, cb) => {
    const qr = "SELECT * FROM followers INNER JOIN users ON followers.follower_id = users.Id_users WHERE following_id = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (rows[0]);
        }
    );
};

// Delete follow
/**************************************************************************/

exports.deleteFollow = (follower, following, cb) => {
    const qr = "DELETE FROM followers WHERE follower_id = ? AND following_id = ?";
    connection.query(
        qr,
        [follower, following],
        (err, result) => {
            if (err) {
                console.error(err);
                return cb(err);
            }
            console.log(`Number of rows affected: ${result.affectedRows}`);
            return cb(null);
        }
    );
};
