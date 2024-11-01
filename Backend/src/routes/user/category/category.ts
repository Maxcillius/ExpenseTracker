import express from 'express'
import db from '../../../libs/db'
import { middleware } from '../../../middleware/authMiddleware'

const router = express.Router()
router.use(middleware)

router.post('/create', async (req, res) => {
    try {
        const { name, color, user_id, is_default } = req.body

        const doesExist = await db.category.findFirst({
            where: {
                name: name,
                user_id: req.session.userId
            }
        })

        const colorExist = await db.category.findFirst({
            where: {
                color: color,
                user_id: req.session.userId
            }
        })

        if(colorExist) {
            res.status(409).json({
                message: "Category with this color already exists"
            })
        }

        if(doesExist) {
            res.status(409).json({
                message: "Category with this name already exists"
            })
            return
        }

        const response = await db.category.create({
            data: {
                name: name,
                user_id: user_id,
                color: color,
                is_default: is_default,
                created_at: new Date(),
                updated_at: new Date(),
            }
        })

        res.status(200).json({
            message: 'Category added successfully'
        })
        return

    } catch(error) {

        res.status(500).json({
            message: 'Error while creating the category'
        })
        return
    }
})


// router.post('/update', async (req, res) => {
//     try {
//         const { name, color } = req.body

//         const response = await db.category.update({
//             where: {
//                 id: 'id'
//             },

//             data: {
//                 name: name,
//                 color: color,
//                 updated_at: Date.now().toString(),
//             }
//         })

//         res.json({
//             message: 'Category updated successfully'
//         })
//         return

//     } catch(error) {

//         res.status(500).json({
//             message: 'Error while updating the category'
//         })
//         return
//     }
// })


router.delete('/delete', async (req, res) => {

    const id = req.headers['id'] as string

    try {

        await db.category.delete({
            where: {
                id: id
            }
        })

        res.status(200).json({
            message: 'Category deleted successfully'
        })
        return

    } catch(error) {

        res.status(500).json({
            message: 'Error while deleting the category'
        })
        return
    }

})


router.get('/getall', async (req, res) => {
    const user_id = req.session.userId

    try {

        const response = await db.category.findMany({
            where: {
                user_id: user_id
            }
        })

        res.status(200).json(response)
        return

    } catch(error) {

        res.status(500).json({
            message: 'Error while fetching the categories'
        })
        return
    }
})


export default router