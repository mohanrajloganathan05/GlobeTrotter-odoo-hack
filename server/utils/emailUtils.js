const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: `"GlobeTrotter Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
        html: `
            <h2>Password Reset OTP</h2>
            <p>Your OTP is <b>${otp}</b></p>
            <p>This OTP is valid for <b>5 minutes</b>.</p>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;
