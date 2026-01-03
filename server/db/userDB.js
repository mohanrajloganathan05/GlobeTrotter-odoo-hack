const dbConnect = require('./connect');

// Check if user exists
const checkUserExists = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT user_id FROM auth WHERE email = ?';
        dbConnect.query(query, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results.length > 0);
        });
    });
};

// Insert new user
const insertUser = (name, email, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO auth (name, email, password) VALUES (?, ?, ?)';
        dbConnect.query(query, [name, email, hashedPassword], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Get full user by email (for login)
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM auth WHERE email = ?';
        dbConnect.query(query, [email], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return resolve(null);
            resolve(results[0]);
        });
    });
};
module.exports = {
    checkUserExists,
    insertUser,
    getUserByEmail
};
