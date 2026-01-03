const db = require('./connect');

const getTripsByUser = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        trip_id,
        trip_name,
        start_date,
        end_date,
        description,
        cover_photo,
        created_at
      FROM trips
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;
    db.query(query, [user_id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = { getTripsByUser };
