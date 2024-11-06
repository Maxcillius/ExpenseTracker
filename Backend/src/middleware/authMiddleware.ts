import express from 'express'

const middleware = express()
middleware.use(express.json())

middleware.use((req, res, next) => {

    console.log(req.session)

    if(!req.session.isLoggedIn) {
        res.status(401).json({ isAuthenticated: false, redirectTo: '/login' })
        return
    }

    return next()
})

export { middleware }