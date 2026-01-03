const express = require("express");
const router = express.Router();
const db = require("../../db/connect"); // adjust path if needed

router.post("/", (req, res) => {
  const {
    trip_id,
    place_name,
    arrival_date,
    departure_date,
    notes,
    stop_order,
  } = req.body;

  const sql = `
    INSERT INTO trip_stops
    (trip_id, place_name, arrival_date, departure_date, notes, stop_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [trip_id, place_name, arrival_date, departure_date, notes, stop_order],
    (err, result) => {
      if (err) {
        console.error("Stop insert error:", err);
        return res.status(500).json({ message: "DB error" });
      }

      res.status(201).json({ message: "Stop added successfully" });
    }
  );
});

module.exports = router;
