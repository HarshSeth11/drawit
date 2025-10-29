import React, { useRef, useEffect, useState } from "react";
import { createSocket } from "./socket";
import { useParams } from "react-router-dom";
import "./index.css";

let socket;

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawing = useRef(false);

  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);
  const { roomId } = useParams();

  // Setup canvas once
  useEffect(() => {
    // Create socket on mount
    socket = createSocket();
    socket.emit("joinRoom", roomId);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Proper sizing with devicePixelRatio (crisper + consistent)
    const dpr = window.devicePixelRatio || 1;
    const displayW = Math.floor(window.innerWidth * 0.8);
    const displayH = Math.floor(window.innerHeight * 0.8);

    canvas.style.width = displayW + "px";
    canvas.style.height = displayH + "px";
    canvas.width = displayW * dpr;
    canvas.height = displayH * dpr;
    ctx.scale(dpr, dpr);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    // Handle remote drawing
    const onRemote = ({ type, nx, ny, color, lineWidth }) => {
      const x = nx * displayW;
      const y = ny * displayH;

      if (type === "begin") {
        ctx.beginPath();
        if (color) ctx.strokeStyle = color;
        if (lineWidth) ctx.lineWidth = lineWidth;
        ctx.moveTo(x, y);
      } else if (type === "draw") {
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (type === "end") {
        ctx.closePath();
      }
    };

    socket.on("drawing", roomId, onRemote);

    socket.on("clear", (roomId) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    return () => socket.off("drawing", onRemote);
  }, [roomId]);

  // Keep local brush style in sync
  useEffect(() => {
    if (!ctxRef.current) return;
    ctxRef.current.strokeStyle = color;
    ctxRef.current.lineWidth = lineWidth;
  }, [color, lineWidth]);

  // Helper to get both pixel + normalized coords
  const getPos = (nativeEvent) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = nativeEvent.clientX - rect.left;
    const y = nativeEvent.clientY - rect.top;
    return { x, y, nx: x / rect.width, ny: y / rect.height };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y, nx, ny } = getPos(e.nativeEvent);
    drawing.current = true;

    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    // tell peers we started
    socket.emit("drawing", { type: "begin", nx, ny, color, lineWidth });
  };

  const draw = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const { x, y, nx, ny } = getPos(e.nativeEvent);

    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();

    // tell peers we moved
    socket.emit("drawing", { type: "draw", nx, ny });
  };

  const stopDrawing = () => {
    if (!drawing.current) return;
    drawing.current = false;
    ctxRef.current.closePath();

    // tell peers we ended
    socket.emit("drawing", { type: "end" });
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <label>Color: </label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

        <label style={{ marginLeft: "10px" }}>Line Width: </label>
        <input
          type="number"
          value={lineWidth}
          min="1"
          max="10"
          onChange={(e) => {
            const value = e.target.value;
            setLineWidth(value == 0 ? "" : Number(value)); // keep empty if nothing is typed
          }}
        />

        {/* Eraser Button */}
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => setColor("#FFFFFF")} // white background as eraser
        >
          Eraser
        </button>

        {/* Clear Screen Button */}
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => {
            const canvas = canvasRef.current;
            const ctx = ctxRef.current;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // tell others to clear
            socket.emit("clear");
          }}
        >
          Clear All
        </button>
      </div>

      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}
