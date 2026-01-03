const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../../utils/hashUtils');
const { getUserByEmail } = require('../../db/userDB');

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        //  Check if user exists
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        //  Verify password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        //  Generate JWT token
        const token = jwt.sign(
            { userId: user.user_id, email: user.email },
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '1d' }
        );

        //  Send response
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.user_id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
