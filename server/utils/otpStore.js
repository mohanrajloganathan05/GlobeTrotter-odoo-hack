const otpStore = new Map();

function set(email, otp) {
    const expiresAt = Date.now() + 5 * 60 * 1000; 
    otpStore.set(email, { otp, expiresAt });
}

function get(email) {
    const data = otpStore.get(email);
    if (!data) return null;

    if (Date.now() > data.expiresAt) {
        otpStore.delete(email);
        return null;
    }

    return data.otp;
}

function deleteOtp(email) {
    otpStore.delete(email);
}

module.exports = { set, get, delete: deleteOtp };
