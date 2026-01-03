const dbConnect = require('./connect');

// 🔹 Check if user exists
const checkUserExists = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT user_id FROM users WHERE email = ?';
        dbConnect.query(query, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results.length > 0);
        });
    });
};

// 🔹 Insert new user
const insertUser = (name, email, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        dbConnect.query(query, [name, email, hashedPassword], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    checkUserExists,
    insertUser
};
