import express from 'express'
import cors from 'cors'
import authRoute from './routes/auth/auth'
import uesrRoute from './routes/user/user'
import session from 'express-session'
import cookieParser from 'cookie-parser'

const router = express()
const port = process.env.PORT || 4000
const secret = process.env.JWT_SECRET as string

router.use(express.json())

router.use(cors({
  origin: ['https://expense-tracker-alpha-coral.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Origin', 'User-Agent', 'DNT', 'Cache-Control', 'X-Mx-ReqToken', 'Keep-Alive', 'X-Requested-With',  
 'If-Modified-Since', 'Cookie', 'Set-Cookie'],
  exposedHeaders: ['Content-Length', 'Content-Range']
}));

router.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // For HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    // sameSite: 'none'  // Important for cross-origin cookies
  },
}))

router.use(cookieParser())

declare module 'express-session' {
  interface SessionData {
    isLoggedIn: boolean
    userId: string
    email: string
    name: string
  }
}

router.use('/api/v1/auth', authRoute)
router.use('/api/v1/user', uesrRoute)

router.listen(port)
console.log('Backend running on port:', port)

export default router