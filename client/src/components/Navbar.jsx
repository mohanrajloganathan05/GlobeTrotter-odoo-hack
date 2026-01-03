import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Map,
    PlusCircle,
    Wallet,
    User,
    LogOut
} from "lucide-react";
import "../styles/Navbar.css";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
    };

    return (
        <>
            <nav className="navbar">
                <h2 className="logo">GlobeTrotter</h2>

                <div className="links">
                    <Link className={isActive("/dashboard") ? "active" : ""} to="/dashboard">
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>

                    <Link className={isActive("/trips") ? "active" : ""} to="/trips">
                        <Map size={18} />
                        My Trips
                    </Link>

                    <Link className={isActive("/create") ? "active" : ""} to="/create">
                        <PlusCircle size={18} />
                        Create Trip
                    </Link>

                    <Link className={isActive("/explore") ? "active" : ""} to="/explore">
                        <Map size={18} />
                        Explore
                    </Link>

                    <Link className={isActive("/profile") ? "active" : ""} to="/profile">
                        <User size={18} />
                        Profile
                    </Link>

                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </nav>


        </>

    );
}
