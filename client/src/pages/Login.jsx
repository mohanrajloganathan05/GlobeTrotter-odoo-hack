import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import travelAnimation from "../assets/LoginAnimation.json";
import API from "../api";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError(""); 

    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container split">
      
      {/* Left Animation Section */}
      <div className="auth-animation">
        <Lottie 
          animationData={travelAnimation}
          loop={true}
        />
        <h2>GlobeTrotter</h2>
        <p>Plan smarter. Travel better.</p>
      </div>

      {/* Right Login Card */}
      <div className="auth-card">
        <h2>Welcome Back 🌍</h2>
        <p className="subtitle">Login to plan your next adventure</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* Display error message */}
        {error && <p style={{ color: "red", marginTop: "6px" }}>{error}</p>}

        <button onClick={handleLogin}>Login</button>

        <p className="switch-text">
          Don’t have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>

    </div>
  );
}
