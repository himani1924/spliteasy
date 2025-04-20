import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import pool from "../db/index.js";

export function initialize(passport){
    const authenticateUser = async (email, password, done)=>{
        try {
            const user = await pool.query(`select * from users where email = $1`, [email])
        if(user.rows.length === 0){
            return done(null, false, {message: 'No user found'})
        }
        const isMatch = await bcrypt.compare(password, user.rows[0].password)
        if(!isMatch){
            return done(null, false, {message: 'Password incorrect'})
        }
        return done(null, user.rows[0])
        } catch (error) {
            return done(error)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))

    passport.serializeUser((user, done)=>done(null, user.id))

    passport.deserializeUser(async (id, done)=>{
        try {
            const res = await pool.query(`select * from users where id = $1`, [id])
            done(null, res.rows[0])
        } catch (error) {
            done(error)
        }
    })
}