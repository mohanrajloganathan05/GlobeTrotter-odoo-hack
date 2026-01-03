import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";


function TripList() {
    const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) {
          setError("User not logged in");
          return;
        }

        const res = await API.get(`/triplist/${user.id}`);
        setTrips(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load trips");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) return <p style={styles.center}>Loading trips...</p>;
  if (error) return <p style={styles.center}>{error}</p>;

  return (
    <div style={styles.page}>
      {trips.length === 0 && <p>No trips found</p>}

      <div style={styles.grid}>
        {trips.map((trip) => (
          <div key={trip.trip_id} style={styles.card} onClick={() => navigate(`/trip/${trip.trip_id}`)}>
            {trip.cover_photo && (
              <img
                src={trip.cover_photo}
                alt={trip.trip_name}
                style={styles.image}
              />
            )}

            <div style={styles.content}>
              <h3 style={styles.title}>{trip.trip_name}</h3>
              <p style={styles.description}>{trip.description}</p>

              <div style={styles.dateRow}>
                <span style={styles.date}>
                  📅 {formatDate(trip.start_date)}
                </span>
                <span style={styles.arrow}>→</span>
                <span style={styles.date}>
                  {formatDate(trip.end_date)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "30px",
    background: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
  },

  center: {
    textAlign: "center",
    marginTop: "50px",
    color: "#475569",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow:
      "0 10px 20px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },

  image: {
    width: "100%",
    height: "190px",
    objectFit: "cover",
  },

  content: {
    padding: "18px",
  },

  title: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "6px",
  },

  description: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "14px",
    lineHeight: "1.5",
  },

  dateRow: {
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    color: "#334155",
    fontWeight: "600",
  },

  date: {
    background: "#e0f2fe",
    padding: "6px 10px",
    borderRadius: "6px",
  },

  arrow: {
    margin: "0 8px",
    color: "#2563eb",
  },
};

export default TripList;
