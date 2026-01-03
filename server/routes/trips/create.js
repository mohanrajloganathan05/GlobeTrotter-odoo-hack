const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addTrip } = require('../../db/tripDB');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('cover_photo'), async (req, res) => {
    try {
        const { user_id, trip_name, start_date, end_date, description } = req.body;
        const cover_photo = req.body.cover_photo ? req.body.cover_photo : null;
        console.log(cover_photo);
        const result = await addTrip({ user_id, trip_name, start_date, end_date, description, cover_photo });
        res.json({ message: 'Trip created successfully', trip_id: result.insertId });

    } catch (err) {
        console.error('Add trip error:', err);
        res.status(500).json({ message: 'Database error', error: err });
    }
});

module.exports = router;