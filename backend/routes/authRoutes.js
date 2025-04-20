import express from 'express'
import passport from 'passport'
import { registerUser } from '../controllers/authController.js'

const router = express.Router()

// localhost:5000/auth/signup
router.post('/signup', registerUser)

router.post('/login', passport.authenticate('local', {
  successRedirect: '/auth/success',
  failureRedirect: '/auth/failure'
}))

router.get('/success', (req, res) => res.send('Logged in!'))
router.get('/failure', (req, res) => res.send('Login failed'))

export default router
