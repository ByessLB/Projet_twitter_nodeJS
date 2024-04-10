const mysql = require ("mysql2");

// Module.exports met à disposition la fonction query

module.exports = {
    query : query,
};

// Pool de connexions internes

const pool = mysql.createPoolCluster ({ canRetry : true });

// Ajouter une connexion

pool.add ({
    host : "localhost",
    user : "root",
    password : "",
    database : "twitter"
});

// Test connexion

pool.getConnection ((err, _connection) => {
    if (err) {
        throw new Error ("Erreur de connexion à la base de données : " + err);
        process.exit(1);
    }
    console.info ("Connexion réussie !");
    _connection.release();
});

function query (sql, params, cb) {
    if (typeof params === "function") {
        cb = params;
        params = [];
    }

    pool.getConnection ((err, connection) => {
        if (err) { cb (err) };

        connection.query (sql, params, (err, rows, fileds) => {
            connection.release();
            cb (err, rows, fileds);
        });
    });
}