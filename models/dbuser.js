const connection = require ("./connect");

// Cryptage
/*************************************************************************/

const bcrypt = require ("bcrypt");
const saltRounds = 10;

// Create user
/*************************************************************************/

exports.createUser = (user, cb) => {
    const qr = "INSERT INTO users(firstname, lastname, username, email, password, age, admin) VALUES (?, ?, ?, ?, ?, ?, ?)";
    // Hashage du MDP
    bcrypt.hash (user.pwd, saltRounds, (err, hasher) => {
        if (err) {
            console.error ("Erreur lors du hachage du mot de passe : " + err);
            throw err;
        };

        connection.query (
            qr,
            [user.first, user.last, user.username, user.email, hasher, user.age, user.admin],
            (err, rows) => {
                if (err) {
                    console.error ("Erreur lors de l'insertion dans la base de données : " + err);
                    if (err.code === "ER_DUP_ENTRY") {
                        if (typeof cb === "function") {
                            return cb ("Email existant");
                        }
                    } else {
                        if (typeof cb === "function") {
                            return cb (err);
                        }
                    }
                } else {
                    if (typeof cb === "function") {
                        return cb (rows);
                    }
                }
            }
        );
    });
};

// Login
/*************************************************************************/

exports.logOne = (user, cb) => {
    const qr = "SELECT * FROM users WHERE username = ?";
    connection.query (
        qr,
        [user.username],
        (err, row) => {
            if (err) {
             // Gérer les erreurs de la requête SQL
                const errorMessage = "Erreur lors de la requête SQL :" + err;
                cb(errorMessage);
            } else {
                if (row.length === 0) {
                     // Aucun utilisateur trouvé avec cet e-mail
                    const notFoundMessage = "Aucun utilisateur trouvé avec cet e-mail : " + user.email;
                    cb({message : notFoundMessage});
                } else {
                    // Comparer les mots de passe hashés
                    bcrypt.compare(user.pwd, row[0].password, function (err, res) {
                        if (err) {
                            // Gérer les erreurs de comparaison des mots de passe
                            const compareErrorMessage = "Erreur lors de la comparaison des mots de passe :" + err;
                            cb({message : compareErrorMessage});
                        } else {
                            if (res) {
                                 // Les mots de passe correspondent, connexion réussie
                                const successMessage = "Connexion réussie pour l'utilisateur : " + row[0].username;
                                cb(null, row[0], {message : successMessage});
                            } else {
                                // Les mots de passe ne correspondent pas
                                const incorrectPasswordMessage = "Les mots de passe ne correspondent pas pour l'utilisateur : " + row[0].email;
                                cb({message : incorrectPasswordMessage});
                            }
                        }
                    });
                }
            };
        }
    );
};

// Get all users
/**************************************************************************/

exports.findAllUsers = (cb) => {
    const qr = "SELECT * FROM users";
    connection.query (
        qr,
        (err, rows) => {
            if (err) throw err;
            return cb (rows);
        }
    );
};

// Get One user
/**************************************************************************/

exports.findOneUser = (id, cb) => {
    const qr = "SELECT * FROM users WHERE Id_users = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (rows[0]);
        }
    );
};

// Update user
/**************************************************************************/

exports.updateUser = (user, cb) => {
    const age = new Date(user.age).toISOString().slice(0, 10);
    const qr = "UPDATE users SET firstname = ?, lastname = ?, username = ?, email = ?, age = ?, admin = ? WHERE Id_users = ?";
    connection.query (
        qr,
        [user.first, user.last, user.username, user.email, age, user.admin, user.id ],
        (err, rows) => {
            if (err) throw err;
            return cb (rows[0]);
        }
    );
};

// Update password
/***************************************************************************/
exports.updateUserPassword = (user, cb) => {
    const qr = "UPDATE users SET password = ? WHERE  username = ?" ;
    bcrypt.hash(user.password , saltRounds , (err, hasher) => {
        if (err) {
            console.error ("Erreur lors du hachage du mot de passe : " + err);
            throw err;
        } else {
            console.log("New Password: ", user.password);
            connection.query(
                qr,
                [hasher, user.username],
                (err, rows) => {
                if (!err) {
                    console.log('Mot de passe modifié avec succès');
                    return cb(rows);
                } else {
                    console.error('Erreur de modification de mot de passe');
                    throw err;
                }
            });
        }
    });
};

// Delete user
/****************************************************************************/

exports.deleteUser = (id, cb) => {
    const qr = "DELETE FROM users WHERE Id_users = ?";
    connection.query (
        qr,
        [id],
        (err, rows) => {
            if (err) throw err;
            return cb (null);
        }
    );
};