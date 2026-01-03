import { useEffect, useState } from "react";
import API from "../api";
import CreateTrip from "./CreateTrip";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  /* useEffect(() => {
    API.get("/trips").then(res => setTrips(res.data));
  }, []); */

  return (
    <div>
      <h1>My Trips</h1>
      <CreateTrip/>
     {/*  {trips.map(trip => (
        <div key={trip.id}>
          <h3>{trip.title}</h3>
          <p>{trip.start_date} → {trip.end_date}</p>
        </div>
      ))} */}
    </div>
  );
}
