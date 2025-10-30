import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [joinId, setJoinId] = useState("");
  const [newRoomId, setNewRoomId] = useState("");
  const navigate = useNavigate();

  const createRoom = () => {
    const id = uuidv4();
    setNewRoomId(id);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(newRoomId);
    alert("Room ID copied to clipboard!");
  };

  const joinRoom = () => {
    if (!joinId.trim()) return alert("Enter a valid Room ID!");
    navigate(`/room/${joinId}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎨 Collaborative Whiteboard</h1>

      {/* Create New Room */}
      <div style={{ marginTop: "30px" }}>
        <button onClick={createRoom}>Create New Room</button>
        {newRoomId && (
          <div style={{ marginTop: "15px" }}>
            <p>Room ID: <b>{newRoomId}</b></p>
            <button onClick={copyRoomId}>Copy Room ID</button>
            <button onClick={() => navigate(`/room/${newRoomId}`)}>Start Drawing</button>
          </div>
        )}
      </div>

      {/* Join Existing Room */}
      <div style={{ marginTop: "40px" }}>
        <h3>Join Existing Room</h3>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={joinId}
          onChange={(e) => setJoinId(e.target.value)}
        />
        <button onClick={joinRoom} style={{ marginLeft: "10px" }}>
          Join Room
        </button>
      </div>
    </div>
  );
}
