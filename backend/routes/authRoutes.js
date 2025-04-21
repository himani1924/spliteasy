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

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

router.get('/logout', (req, res) => {
  req.logout(async (err) => {
    if (err) return res.status(500).json({ message: "Error logging out" });

    if (req.session) {
      req.session.destroy(async (err) => {
        if (err) return res.status(500).json({ message: "Error destroying session" });
        res.clearCookie();

        res.json({ message: "Logged out successfully" });
      });
    } else {
      res.json({ message: "No active session" });
    }
  });
})

export default router
