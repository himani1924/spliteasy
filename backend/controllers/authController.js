import pool from "../db/index.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res)=>{
    const {name,  email, password } = req.body;
    try {
        if(!email || !password || !name){
            return res.status(400).json({ error: "Please fill all fields" });
        }
        const existing = await pool.query(`select * from users where email = $1`, [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`,
            [email, hashedPassword]
        );
        res.status(201).json({ user: newUser.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
}