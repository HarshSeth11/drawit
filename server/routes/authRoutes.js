import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        // console.log(username);
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        console.log(newUser);

        return res.status(201).json({ message: "User registered successfully"});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error : err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if(!user) return res.status(400).json({ message : "Invalid username or password"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message : "Invalid username or password" });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;