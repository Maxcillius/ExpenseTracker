import express from 'express'
import cors from 'cors'
import authRoute from './routes/auth/auth'
import uesrRoute from './routes/user/user'
import session from 'express-session'
import cookieParser from 'cookie-parser'

const router = express()
const port = process.env.PORT || 4000
const secret = process.env.JWT_SECRET as string

const corsOptions = {
  credentials: true,
  origin: 'https://expense-tracker-alpha-coral.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Origin', 'User-Agent', 'DNT', 'Cache-Control', 'X-Mx-ReqToken', 'Keep-Alive', 'X-Requested-With', 'If-Modified-Since', 'Cookie'],
  exposedHeaders: ['set-cookie']
};

router.use(express.json())
router.use(cors(corsOptions))
router.options('*', cors(corsOptions));

// Session configuration
router.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // For HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: 'none'  // Important for cross-origin cookies
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