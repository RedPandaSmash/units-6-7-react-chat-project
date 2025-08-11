//this page will have two parts. a static form
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ExistingRoomsNavigation from "../components/ExistingRoomsNavigation";

export default function CurrentRoom() {
  // hooks
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [messagesData, setMessagesData] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // use effect for fetching room info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      res.json({
        error: "you may not be logged in.",
      });
      return;
    }

    fetch(`http://localhost:8080/api/rooms/${roomId}`, {
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
        setRoomData(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        // cleaning up
        console.log("Data:", roomData);
      });
  }, [roomId]);

  // use effect for fetching messages info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      res.json({
        error: "you may not be logged in.",
      });
      return;
    }
    fetch(`http://localhost:8080/api/messages/${roomId}`, {
      headers: { Authorization: token },
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
        console.log("Fetched messages data:", data);
        setMessagesData(data.roomMessages || []);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        // cleaning up
        console.log("Data:", messagesData);
      });
  }, [roomId]);

  // code to handle form behavior and submition to post new message to current room
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`http://localhost:8080/api/messages/${roomId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ content: newMessage }),
    });

    const data = await res.json();
    if (res.ok && data.savedMessage) {
      // Add new message to messagesData
      setMessagesData((prev) => [...prev, data.savedMessage]);
      setNewMessage("");
    } else {
      alert(data.error || "Failed to post message.");
    }
  };

  return (
    <div>
      <ExistingRoomsNavigation></ExistingRoomsNavigation>
      <h1>{roomData ? roomData.name : "Could Not Load Room Name"}</h1>
      <ul>
        {messagesData.length > 0 ? (
          messagesData.map((message) => (
            <li key={message._id}>
              <strong>{message.user}</strong>: {message.body}
            </li>
          ))
        ) : (
          <li>No messages found.</li>
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
