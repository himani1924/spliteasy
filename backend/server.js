import express from 'express';
import session from 'express-session'
import passport from 'passport'
import { initialize } from './services/passportConfig.js'
import authRoutes from './routes/authRoutes.js'
import groupRoutes from './routes/groupRoutes.js'
import test from './routes/dummy.js'
import { configDotenv } from 'dotenv';
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http';
import socketHandler from './sockets/socketHandler.js'

configDotenv()

const app = express();
const PORT = process.env.PORT || 5000;

initialize(passport)

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true,
}));
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
app.use('/test', test)
app.use('/groups', groupRoutes)

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  }
})

// io.on('connection', (socket)=>{
//   console.log('a user connected', socket.id)
//   socket.on('disconnect',()=>{
//     console.log('user disconnected', socket.id)
//   })
// })

socketHandler(io)



app.listen(PORT, ()=>{
    console.log('server started on port', PORT);
})

export { app, io };