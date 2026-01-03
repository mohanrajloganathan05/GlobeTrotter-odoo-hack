const express = require('express');
const router = express.Router();
const { hashPassword } = require('../../utils/hashUtils');
const { updatePassword } = require('../../db/userDB');

router.post('/', async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password required' });
    }

    try {
        const hashedPassword = await hashPassword(newPassword);

        const result = await updatePassword(email, hashedPassword);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Password changed successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Password reset failed' });
    }
});

module.exports = router;
