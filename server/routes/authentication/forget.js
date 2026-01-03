const express = require('express');
const router = express.Router();

const otpStore = require('../../utils/otpStore');
const sendOtpEmail = require('../../utils/emailUtils');
const { getUserByEmail } = require('../../db/userDB');

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        otpStore.set(email, otp);

        await sendOtpEmail(email, otp);

        res.json({ message: 'OTP sent successfully' });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Failed to send OTP' });
    }
});

module.exports = router;
