import { useEffect, useState } from "react";
import { Plus, Calendar, MapPin, Wallet, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ stats must NEVER be null
  const [stats, setStats] = useState({
    totalTrips: 0,
    totalCities: 0,
    totalBudget: 0
  });

  /* ===============================
     AUTH CHECK + LOAD USER
     =============================== */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/", { replace: true });
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    // your login returns `id`
    setUser({
      id: parsedUser.id,
      name: parsedUser.name
    });
  }, [navigate]);

  /* ===============================
     FETCH TRIPS
     =============================== */
  useEffect(() => {
    if (!user?.id) return;

    const fetchDashboardData = async () => {
      try {
        const res = await API.get(`/get-trips/${user.id}`);

        const tripsData = Array.isArray(res.data.trips)
          ? res.data.trips
          : [];

        // dashboard preview (max 3)
        setTrips(tripsData.slice(0, 3));

        // stats
        setStats({
          totalTrips: tripsData.length,
          totalCities: tripsData.length, // placeholder
          totalBudget: 0
        });

      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  /* ===============================
     LOADING STATE
     =============================== */
  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading your travel overview…
      </div>
    );
  }

  /* ===============================
     UI
     =============================== */
  return (
    <div className="dashboard">

      {/* HERO */}
      <section className="dashboard-hero">
        <div className="hero-text">
          <h2>Welcome back, {user.name} 🌍</h2>
          <p>Your next journey starts here</p>

          <button
            className="primary-btn"
            onClick={() => navigate("/create")}
          >
            <Plus size={18} />
            Plan New Trip
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <Calendar />
          <div>
            <h3>{stats.totalTrips}</h3>
            <span>Trips Planned</span>
          </div>
        </div>

        <div className="stat-card">
          <MapPin />
          <div>
            <h3>{stats.totalCities}</h3>
            <span>Cities Covered</span>
          </div>
        </div>

        <div className="stat-card">
          <Wallet />
          <div>
            <h3>₹{stats.totalBudget}</h3>
            <span>Total Budget</span>
          </div>
        </div>
      </section>

      {/* RECENT TRIPS */}
      <section className="dashboard-trips">
        <div className="section-header">
          <h3>Your Recent Trips</h3>
          <button
            className="link-btn"
            onClick={() => navigate("/my-trips")}
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="empty-state">
            <p>No trips planned yet</p>
            <button
              className="primary-btn"
              onClick={() => navigate("/create")}
            >
              Start Your First Trip
            </button>
          </div>
        ) : (
          <div className="trip-grid">
            {trips.map(trip => (
              <div
                key={trip.trip_id}
                className="trip-card"
                onClick={() => navigate("/my-trips")}
              >
                <img
                  src="/trip-placeholder.jpg"
                  alt={trip.trip_name}
                />
                <div className="trip-info">
                  <h4>{trip.trip_name}</h4>
                  <p>
                    {trip.start_date} – {trip.end_date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
