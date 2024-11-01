import zod from 'zod'

const UserSignup = zod.object({
    name:               zod.string(),
    password:           zod.string().min(6).max(28),
    email:              zod.string().email(),
})

const UserSignin = zod.object({
    password:           zod.string().min(6).max(28),
    email:              zod.string().email(),
})

export { UserSignin, UserSignup }