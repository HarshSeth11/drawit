// src/pages/Home.js
import React from "react";
import CreateRoomButton from "./CreateRoom";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Collaborative Whiteboard</h1>
      <CreateRoomButton />
    </div>
  );
}
