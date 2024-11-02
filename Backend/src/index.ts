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
    credentials: true,
    origin: [
      "http://localhost:8080",
    ]
}))
router.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30
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
router.use('/api/v1/user',  uesrRoute)


router.listen(port)
console.log('Backend running on port:', port)


export default router  