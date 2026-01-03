import { useState } from "react";
import API from "../api";
import "./forgetPassword.css";
import { useNavigate } from "react-router-dom";
export default function ForgotPassword() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stage, setStage] = useState(1); // 1 = info, 2 = otp, 3 = reset password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  
  const handleUserInfoSubmit = async () => {
    if (!name) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    try {
      await API.post("/forgot-password", { name, email });
      setStage(2); 
      setSuccess("OTP sent to your email");
    } catch {
      setError("Failed to send OTP. Please check your details.");
    }
  };

  
  const handleOtpSubmit = async () => {
    if (!otp) {
      setError("Please enter the OTP sent to your email");
      return;
    }

    setError("");
    try {
      await API.post("/verify-otp", { email, otp });
      setStage(3); 
      setSuccess("OTP verified! Set your new password.");
    } catch {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if(newPassword!=confirmPassword){
        setError("Mismatch in pass word");
        return;
    }

    setError("");
    try {
      await API.post("/reset-password", { email, newPassword });
      setSuccess("Password reset successfully! You can now login.");
      setStage(1);
      setName("");
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="fp-auth-container" style={{ background: "linear-gradient(135deg, #6e8efb, #a777e3)" }}>
      <div className="fp-auth-card auth-card" style={{ backdropFilter: "blur(10px)", borderRadius: "20px", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}>
        <h2 style={{ textAlign: "center" }}>Forgot Password 🔒</h2>
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        {success && <p style={{ color: "limegreen", marginBottom: "10px" }}>{success}</p>}

        {stage === 1 && (
          <>
            <input
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button onClick={handleUserInfoSubmit}>Send OTP</button>
          </>
        )}

        {stage === 2 && (
          <>
            <p>Enter the OTP sent to your email</p>
            <input
              placeholder="OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
            <button onClick={handleOtpSubmit}>Verify OTP</button>
          </>
        )}

        {stage === 3 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleResetPassword}>Set New Password</button>
          </>
        )}
      </div>
    </div>
  );
}
