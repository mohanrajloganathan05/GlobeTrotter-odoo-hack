const express = require("express");
const router = express.Router();
const db = require("../../db/connect");

router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT 
      trip_id,
      user_id,
      trip_name,
      start_date,
      end_date,
      description,
      cover_photo
    FROM trips
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Trip list error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const trips = results.map(trip => {
      let imageBase64 = null;

      if (trip.cover_photo) {
        // 🔥 Convert BLOB (Buffer) → Base64 string
        const base64String = Buffer.from(trip.cover_photo).toString("utf-8");

        // If already has data:image prefix, keep it
        imageBase64 = base64String.startsWith("data:image")
          ? base64String
          : `data:image/jpeg;base64,${base64String}`;
      }

      return {
        ...trip,
        cover_photo: imageBase64,
      };
    });

    res.json(trips);
  });
});

module.exports = router;
