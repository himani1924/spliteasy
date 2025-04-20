import express from 'express';
import session from 'express-session'
import passport from 'passport'
import { initialize } from './services/passportConfig.js'
import authRoutes from './routes/authRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;

initialize(passport)

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: false
  }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)

app.listen(PORT, ()=>{
    console.log('server started on port', PORT);
})