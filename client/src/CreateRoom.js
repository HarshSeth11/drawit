import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"

export default function CreateRoomButton() {
    const navigate = useNavigate();

    const createRoom = () => {
        const roomId = uuidv4();
        navigate(`/room/${roomId}`);
    }

    return (
        <button onClick={createRoom}>
            Create New Whiteboard
        </button>
    )
}