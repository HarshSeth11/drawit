import React, { useState} from "react";
import api from "./api";

export default function Auth({ setToken }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

        try {
            const res = await api.post(endpoint, { username, password });
            if(res.data.token) {
                localStorage.setItem("token", res.data.token);
                setToken(res.data.token);
            }
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div style={{ margin: "20px"}}>
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /><br />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br />
                <button type="submit">{isLogin ? "Login" : "Register"}</button>
            </form>
            <p>
                {isLogin ? "New user?" : "Already have an account?"}{" "}
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Register here" : "Login Here"}
                </button>
            </p>
        </div>
    );
}