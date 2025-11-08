# 🎨 DrawIt — Real-Time Collaborative Whiteboard

**DrawIt** is a real-time collaborative whiteboard application built with **React**, **Node.js**, and **WebSockets**.  
It allows multiple users to draw together on a shared canvas, create or join unique rooms using a generated room ID, and collaborate visually in real time.

---

## 🚀 Features

- 🧑‍🤝‍🧑 **Real-Time Collaboration** — Multiple users can draw simultaneously on the same whiteboard.
- 🔒 **Room-Based Sessions** — Each drawing session has a unique room ID for privacy and easy sharing.
- ⚡ **Low-Latency Updates** — Built using WebSockets for instant synchronization.
- 📋 **Copy & Join Room Codes** — Create a room and share the room code with others to join instantly.
- 🖌️ **Drawing Tools** — Freehand drawing with customizable colors and stroke sizes.
- 🧽 **Clear Canvas** — Option to clear the board for all participants in the room.
- 💾 *(Optional)* **Save Canvas** — Export your drawing as an image file.

---

## 🏗️ Tech Stack

**Frontend:**
- React.js
- HTML5 Canvas API
- Socket.IO Client
- Tailwind CSS (for styling)

**Backend:**
- Node.js
- Express.js
- Socket.IO Server
- UUID (for room ID generation)

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/drawit.git
cd drawit
````

### 2. Install dependencies

#### For the server

```bash
cd server
npm install
```

#### For the client

```bash
cd ../client
npm install
```

---

## ▶️ Running the Application

### Start the backend server

```bash
cd server
npm run start
```

### Start the frontend

```bash
cd ../client
npm run start
```

Now open your browser at **[http://localhost:3000](http://localhost:3000)** 🎉

---

## ⚙️ Project Structure

```
drawit/
│
├── client/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── socket.js
│   │   └── App.js
│   └── package.json
│
├── server/               # Node.js backend
│   ├── index.js
│   ├── socketManager.js
│   └── package.json
│
└── README.md
```

---

## 🌐 How It Works

1. When a user creates a room, a unique `roomId` is generated (using UUID).
2. The creator can copy the code and share it with others.
3. Other users join the room by entering the `roomId`.
4. The backend manages rooms and relays drawing events via WebSocket connections.
5. Each stroke drawn by one user is instantly broadcast to all other users in that room.

---

## 🔮 Future Enhancements

* 🗂️ User authentication (JWT-based)
* 💬 Real-time chat in rooms
* 🎥 Screen recording or replay of drawing sessions
* 🌍 Deployment using AWS or Render

---

## 🧑‍💻 Author

**Harsh Seth**
Senior Software Developer | Full-Stack Engineer
🌐 [LinkedIn](https://www.linkedin.com/in/harshseth) • 💻 [GitHub](https://github.com/your-username)

---

> “DrawIt lets ideas come alive — one stroke at a time.”

```

---

Would you like me to include a short **section on how to deploy it (Render / Vercel + Railway)** so you can make it production-ready for your portfolio or job application?
```
