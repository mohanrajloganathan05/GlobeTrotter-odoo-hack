const db = require('./connect');

// Insert a new trip
const addTrip = (tripData) => {
    const { user_id, trip_name, start_date, end_date, description, cover_photo } = tripData;

    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO trips 
            (user_id, trip_name, start_date, end_date, description, cover_photo)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [user_id, trip_name, start_date, end_date, description, cover_photo], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

module.exports = { addTrip};
