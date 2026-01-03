import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
// import API from "../api"; // Uncomment for actual use

function TripDetails() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [stop, setStop] = useState({
    place_name: "",
    arrival_date: "",
    departure_date: "",
    notes: "",
    stop_order: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStop({ ...stop, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await API.post("/stops", { trip_id: tripId, ...stop });
      alert("✅ Stop added successfully");
      setStop({
        place_name: "",
        arrival_date: "",
        departure_date: "",
        notes: "",
        stop_order: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add stop");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Back Button - Positioned Top Left */}
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        <span style={{ fontSize: "20px" }}>←</span> Back
      </button>

      <div style={styles.container}>
        <div style={styles.headerSection}>
          <h2 style={styles.heading}>Add Trip Stop</h2>
          <p style={styles.subHeading}>Detail your next destination in the itinerary</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.card}>
          {/* Place Name */}
          <div style={styles.field}>
            <label style={styles.label}>Place Name</label>
            <input
              name="place_name"
              placeholder="stop name"
              value={stop.place_name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          {/* Dates */}
          <div style={styles.row}>
            <div style={{ ...styles.field, flex: 1 }}>
              <label style={styles.label}>Arrival</label>
              <input
                type="date"
                name="arrival_date"
                value={stop.arrival_date}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={{ ...styles.field, flex: 1 }}>
              <label style={styles.label}>Departure</label>
              <input
                type="date"
                name="departure_date"
                value={stop.departure_date}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          {/* Stop Order */}
          <div style={styles.field}>
            <label style={styles.label}>Stop Order</label>
            <input
              type="number"
              name="stop_order"
              placeholder="1, 2, 3..."
              value={stop.stop_order}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <small style={styles.helper}>The sequence of this stop in your journey</small>
          </div>

          {/* Notes */}
          <div style={styles.field}>
            <label style={styles.label}>Notes</label>
            <textarea
              name="notes"
              placeholder="Activities, food spots, reminders..."
              value={stop.notes}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>

          <button 
            type="submit" 
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = "#1d4ed8"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}
          >
            Add Stop to Trip
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    background: "#f1f5f9",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Horizontal Center
    justifyContent: "center", // Vertical Center
    padding: "20px",
    position: "relative", // Needed for absolute positioning of back button
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
  },
  backBtn: {
    position: "absolute",
    top: "30px",
    left: "30px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    color: "#475569",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    transition: "all 0.2s",
  },
  container: {
    width: "100%",
    maxWidth: "500px",
  },
  headerSection: {
    textAlign: "center",
    marginBottom: "24px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 8px 0",
  },
  subHeading: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
  },
  card: {
    background: "#ffffff",
    padding: "32px",
    borderRadius: "20px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  field: {
    marginBottom: "20px",
  },
  row: {
    display: "flex",
    gap: "16px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.025em",
    marginBottom: "8px",
    color: "#475569",
  },
  helper: {
    fontSize: "12px",
    color: "#94a3b8",
    marginTop: "6px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    color: "#1e293b",
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    minHeight: "100px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    resize: "none",
    boxSizing: "border-box",
    color: "#1e293b",
  },
  button: {
    width: "100%",
    padding: "16px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background 0.2s ease",
  },
};

export default TripDetails;