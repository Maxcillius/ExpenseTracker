import express from 'express'
import db from '../../libs/db'
import { UserSignin, UserSignup } from '../../libs/zod'
import { middleware } from '../../middleware/authMiddleware'
const router = express.Router()


// User signin route
router.post(('/user/signin'), async (req, res) => {

    const { email, password } = req.body
    const validate = UserSignin.safeParse({
        email,
        password
    })

    if(!validate.success) {

        res.status(401).json({
            message: 'Credential format invalid'
        })
        return
    }

    const userExist = await db.user.findFirst({
        where: {
            email: email
        }
    })

    if(!userExist) {
        res.status(401).json({
            message: "User with this email does no exists"
        })
        return
    }

    try {

        const response = await db.user.findFirst({
            where: {
                email: email,
                password: password
            }
        })

        req.session.isLoggedIn = true
        req.session.name = response?.name
        req.session.userId = response?.id
        req.session.email = response?.email


        if(response) {
            res.status(200).json({
                message: 'Successfully logged in',
                user: {
                    uid: response.id,
                    name: response.name,
                    email: response.email
                }
            })
            return
        }
        else {
            res.status(401).json({
                message: 'Wrong password'
            })
            return
        }
    } catch (error) {

        res.status(500).json({
            message: 'Error while signing in'
        })
        return
    }

})


// User signup route
router.post(('/user/signup'), async (req, res) => {

    const { name, email, password } = req.body
    const validate = UserSignup.safeParse({
        email,
        password,
        name
    })

    if(!validate.success) {

        res.status(401).json({
            message: 'Credential format invalid'
        })
        return
    }

    const doesExist = await db.user.findFirst({
        where: {
            email: email
        }
    })

    if(doesExist) {
        res.status(409).json({
            message: "User with this email already exists"
        })
        return
    }

    try {
        const response = await db.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                created_at: new Date(),
                updated_at: new Date(),
            }
        })

        req.session.isLoggedIn = true
        req.session.name = response?.name
        req.session.userId = response?.id
        req.session.email = response?.email

        res.status(200).json({
            message: 'Successfully signed up',
            user: {
                uid: response.id,
                name: response.name,
                email: response.email
            }
        })

        return
    } catch(error) {

        res.status(500).json({
            message: 'Error while signing in',
            error: error
        })
        return
    }

})


router.get(('/user/signout'), (req, res) => {

    req.session.destroy((error) => {
        if (error) {

            res.status(500).json({
                message: 'Error while logging out'
            })
            return
        } else {
            res.clearCookie('connect.sid')
            res.status(200).json({
                message: "Logout successfully"
            })
            return
        }
    })

})


router.get(('/user/authenticated'), middleware, (req, res) => {
    res.json({
        isAuthenticated: true,
        user: {
            uid: req.session.userId,
            name: req.session.name,
            email: req.session.email
        }
    })
    return
})


router.get(('/user/signout'), (req, res) => {

    req.session.destroy((error) => {
        if (error) {

            res.status(500).json({
                message: 'Error while logging out'
            })
            return
        } else {
            res.redirect('/')
            return
        }
    })

})


export default router