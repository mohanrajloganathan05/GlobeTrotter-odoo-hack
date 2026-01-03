import { useState } from "react";
import API from "../api";

export default function CreateTrip() {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const createTrip = async () => {
    await API.post("/trips", {
      title,
      start_date: start,
      end_date: end
    });
    window.location.href = "/dashboard";
  };

  return (
    <div>
      <h2>Create Trip</h2>
      <input placeholder="Trip Name" onChange={e => setTitle(e.target.value)} />
      <input type="date" onChange={e => setStart(e.target.value)} />
      <input type="date" onChange={e => setEnd(e.target.value)} />
      <button onClick={createTrip}>Save</button>
    </div>
  );
}
