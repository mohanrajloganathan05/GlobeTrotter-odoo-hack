const express = require('express');
const router = express.Router();
const otpStore = require('../../utils/otpStore');

router.post('/', (req, res) => {
    const { email, otp } = req.body;
    console.log(email,otp)
    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const storedOtp = otpStore.get(email);
    console.log(storedOtp)
    if (!storedOtp) {
        return res.status(400).json({ message: 'OTP expired or not found' });
    }

    if (storedOtp != otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP verified successfully
    otpStore.delete(email);

    res.json({ message: 'OTP verified successfully' });
});

module.exports = router;
