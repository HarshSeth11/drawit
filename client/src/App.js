import React, { useState } from "react";
import Whiteboard from "./Whiteboard";
import Auth from "./Auth"; // 👈 our login/register component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  

  // If no token → show Auth form
  if (!token) {
    return <Auth setToken={setToken} />;
  }

  // If token exists → show Whiteboard
  return (
    <div>
      <h1>Hello Whiteboard</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token"); // logout
          setToken(null);
        }}
      >
        Logout
      </button>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Whiteboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
