// this reusable component will house the navigation bar containing buttons linking to all existing rooms. It will show up on the dashboard page and any page corresponding to a room.

import React, { useState, useEffect } from "react";

export default function ExistingRoomsNavigation() {
  // hooks
  const [data, setData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      res.json({
        error: "you may not be logged in.",
      });
      return;
    }

    fetch("http://localhost:8080/api/rooms", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          res.json({
            error: "your session may have expired.",
          });
          return;
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        // cleaning up
        console.log("Data:", data);
      });
  }, []);
  // debugging
  console.log(data);
  return (
    <nav>
      <h3>Existing Rooms</h3>
      {data && Array.isArray(data.rooms) ? (
        <ul>
          {data.rooms.map((room) => (
            <li key={room._id}>{room.name}</li>
          ))}
        </ul>
      ) : (
        <p>No rooms found.</p>
      )}
    </nav>
  );
}
