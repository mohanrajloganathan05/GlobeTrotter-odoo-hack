const express = require('express');
const router = express.Router();
const { getTripsByUser } = require('../../db/tripFetchDB');

router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const trips = await getTripsByUser(user_id);

    res.json({ trips });
  } catch (err) {
    console.error('Get trips error:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

module.exports = router;
