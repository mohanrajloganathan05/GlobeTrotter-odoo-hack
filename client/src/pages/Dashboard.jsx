import { useEffect, useState } from "react";
import { Plus, Calendar, MapPin, Wallet, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import CreateTrip from "./CreateTrip";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);

  // ✅ stats is NEVER null
  const [stats, setStats] = useState({
    totalTrips: 0,
    totalCities: 0,
    totalBudget: 0
  });

  const [loading, setLoading] = useState(true);

  /* AUTH CHECK + LOAD USER */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/", { replace: true });
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    setUser({
      id: parsedUser.id,
      name: parsedUser.name
    });
  }, [navigate]);

  /* FETCH DASHBOARD DATA */
  useEffect(() => {
    if (!user?.id) return;

    const fetchDashboardData = async () => {
      try {
        const res = await API.get(`/get-trips/${user.id}`);
        const tripsData = res.data.trips || [];

        setTrips(tripsData.slice(0, 3));

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

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading your travel overview…
      </div>
    );
  }

  return (
    <div>
      <h1>My Trips</h1>
      <CreateTrip/>
     {/*  {trips.map(trip => (
        <div key={trip.id}>
          <h3>{trip.title}</h3>
          <p>{trip.start_date} → {trip.end_date}</p>
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
                <img src="/trip-placeholder.jpg" alt={trip.trip_name} />
                <div className="trip-info">
                  <h4>{trip.trip_name}</h4>
                  <p>{trip.start_date} – {trip.end_date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
