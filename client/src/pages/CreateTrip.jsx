import React, { useState } from "react";
import API from "../api";

/* Helper: convert image file to Base64 */
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
};

const CreateTrip = () => {
  const [tripData, setTripData] = useState({
    tripName: "",
    startDate: "",
    endDate: "",
    description: "",
    cover_photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleFileChange = (e) => {
    setTripData({ ...tripData, cover_photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("User not logged in");
        return;
      }

      let base64Image = null;
      if (tripData.cover_photo) {
        base64Image = await convertToBase64(tripData.cover_photo);
      }

      const payload = {
        user_id: user.id,
        trip_name: tripData.tripName,
        start_date: tripData.startDate,
        end_date: tripData.endDate,
        description: tripData.description,
        cover_photo: base64Image, // Base64 string
      };

      const res = await API.post("/create-trip", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("✨ Trip created successfully!");
      console.log(res.data);

      setTripData({
        tripName: "",
        startDate: "",
        endDate: "",
        description: "",
        cover_photo: null,
      });

    } catch (error) {
      console.error("Create trip error:", error);
      alert("❌ Failed to create trip");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.headerSection}>
          <h2 style={styles.heading}>Create a New Trip</h2>
          <p style={styles.subHeading}>
            Plan your next adventure in just a few steps.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Trip Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Trip Name</label>
            <input
              type="text"
              name="tripName"
              placeholder="e.g. Summer in Ooty"
              value={tripData.tripName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          {/* Dates */}
          <div style={styles.dateRow}>
            <div style={styles.flexItem}>
              <label style={styles.label}>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={tripData.startDate}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.flexItem}>
              <label style={styles.label}>End Date</label>
              <input
                type="date"
                name="endDate"
                value={tripData.endDate}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          {/* Description */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Trip Description</label>
            <textarea
              name="description"
              placeholder="Mention places, food, activities..."
              value={tripData.description}
              onChange={handleChange}
              rows="4"
              style={styles.textarea}
            />
          </div>

          {/* Cover Photo */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Cover Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </div>

          {/* Submit */}
          <button type="submit" style={styles.button}>
            Create Trip
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "550px",
    padding: "40px",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  },
  headerSection: {
    textAlign: "center",
    marginBottom: "30px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "8px",
  },
  subHeading: {
    color: "#64748b",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#475569",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    resize: "vertical",
  },
  dateRow: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  flexItem: {
    flex: "1 1 200px",
  },
  fileInput: {
    fontSize: "14px",
  },
  button: {
    padding: "14px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
};

export default CreateTrip;
